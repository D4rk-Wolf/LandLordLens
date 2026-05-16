import { API_URL } from './constants';
import { logger } from './logger';
import { supabase } from '../lib/supabase';

interface RequestConfig {
  headers?: Record<string, string>;
  cache?: boolean;
  cacheTTL?: number;
}

async function getAuthHeaders(): Promise<Record<string, string>> {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    return { Authorization: `Bearer ${session.access_token}` };
  }
  return {};
}

class APIClient {
  private pendingRequests: Map<string, Promise<unknown>> = new Map();

  private getRequestKey(url: string, options?: RequestInit): string {
    return `${url}:${JSON.stringify(options)}`;
  }

  private async fetchAndDeduplicate<T>(url: string, options: RequestInit = {}): Promise<T> {
    const requestKey = this.getRequestKey(url, options);

    if (this.pendingRequests.has(requestKey)) {
      logger.debug(`Deduplicating request: ${url}`);
      return this.pendingRequests.get(requestKey) as Promise<T>;
    }

    const requestPromise = fetch(url, options)
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json().catch(() => ({ error: response.statusText }));
          throw new Error(error.error || `HTTP ${response.status}`);
        }
        return response.json();
      })
      .finally(() => {
        this.pendingRequests.delete(requestKey);
      });

    this.pendingRequests.set(requestKey, requestPromise);
    return requestPromise;
  }

  async get<T>(endpoint: string, _token?: string, config: RequestConfig = {}): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    const authHeaders = await getAuthHeaders();
    const options: RequestInit = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...authHeaders, ...config.headers },
    };
    return this.fetchAndDeduplicate<T>(url, options);
  }

  async post<T>(endpoint: string, data: unknown, _token?: string, config: RequestConfig = {}): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    const isFormData = data instanceof FormData;
    const authHeaders = await getAuthHeaders();
    const headers: Record<string, string> = { ...authHeaders, ...config.headers };
    if (!isFormData) headers['Content-Type'] = 'application/json';

    const options: RequestInit = {
      method: 'POST',
      headers,
      body: isFormData ? (data as BodyInit) : JSON.stringify(data),
    };

    return fetch(url, options).then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }
      return response.json();
    });
  }

  async put<T>(endpoint: string, data: unknown, _token?: string, config: RequestConfig = {}): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    const authHeaders = await getAuthHeaders();
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders, ...config.headers },
      body: JSON.stringify(data),
    };
    return fetch(url, options).then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }
      return response.json();
    });
  }

  async delete<T>(endpoint: string, _token?: string, config: RequestConfig = {}): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    const authHeaders = await getAuthHeaders();
    const options: RequestInit = {
      method: 'DELETE',
      headers: { ...authHeaders, ...config.headers },
    };
    return fetch(url, options).then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }
      return response.json();
    });
  }

  async parallel<T>(requests: Array<() => Promise<T>>): Promise<T[]> {
    return Promise.all(requests.map((req) => req()));
  }
}

export const apiClient = new APIClient();
