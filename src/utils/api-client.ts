/**
 * Optimized API Client
 * Provides request caching, debouncing, and parallel request handling
 */

import { API_URL } from './constants';
import { logger } from './logger';

interface RequestConfig {
  headers?: Record<string, string>;
  cache?: boolean; // Deprecated, kept for backward compatibility
  cacheTTL?: number; // Deprecated
}

class APIClient {
  private pendingRequests: Map<string, Promise<unknown>> = new Map();

  private getRequestKey(url: string, options?: RequestInit): string {
    return `${url}:${JSON.stringify(options)}`;
  }

  private async fetchAndDeduplicate<T>(
    url: string,
    options: RequestInit = {},
  ): Promise<T> {
    const requestKey = this.getRequestKey(url, options);

    // Check if request is already pending
    if (this.pendingRequests.has(requestKey)) {
      logger.debug(`Deduplicating request: ${url}`);
      return this.pendingRequests.get(requestKey) as Promise<T>;
    }

    // Make the request
    const requestOptions: RequestInit = {
      ...options,
      credentials: 'include', // Ensure cookies are sent with requests
    };

    const requestPromise = fetch(url, requestOptions)
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json().catch(() => ({ error: response.statusText }));
          throw new Error(error.error || `HTTP ${response.status}`);
        }
        return response.json();
      })
      .finally(() => {
        // Remove from pending requests
        this.pendingRequests.delete(requestKey);
      });

    // Store pending request
    this.pendingRequests.set(requestKey, requestPromise);

    return requestPromise;
  }

  async get<T>(endpoint: string, token?: string, config: RequestConfig = {}): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...config.headers,
      },
    };

    return this.fetchAndDeduplicate<T>(url, options);
  }

  async post<T>(
    endpoint: string,
    data: unknown,
    token?: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    const isFormData = data instanceof FormData;

    const headers: Record<string, string> = {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...config.headers,
    };

    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    const options: RequestInit = {
      method: 'POST',
      headers,
      body: isFormData ? (data as BodyInit) : JSON.stringify(data),
    };

    // POST requests shouldn't be cached
    return fetch(url, { ...options, credentials: 'include' }).then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }
      return response.json();
    });
  }

  async put<T>(
    endpoint: string,
    data: unknown,
    token?: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    const options: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...config.headers,
      },
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

  async delete<T>(endpoint: string, token?: string, config: RequestConfig = {}): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...config.headers,
      },
    };

    return fetch(url, options).then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }
      return response.json();
    });
  }

  // Parallel requests helper
  async parallel<T>(requests: Array<() => Promise<T>>): Promise<T[]> {
    return Promise.all(requests.map((req) => req()));
  }
}

export const apiClient = new APIClient();
