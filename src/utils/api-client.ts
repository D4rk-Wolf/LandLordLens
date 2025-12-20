/**
 * Optimized API Client
 * Provides request caching, debouncing, and parallel request handling
 */

import { API_URL } from './constants';
import { logger } from './logger';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

interface RequestConfig {
  headers?: Record<string, string>;
  cache?: boolean;
  cacheTTL?: number; // Time to live in milliseconds
}

class APIClient {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private pendingRequests: Map<string, Promise<any>> = new Map();
  private readonly DEFAULT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  private getCacheKey(url: string, options?: RequestInit): string {
    return `${url}:${JSON.stringify(options)}`;
  }

  private isCacheValid(entry: CacheEntry<any>): boolean {
    return Date.now() < entry.expiry;
  }

  private async fetchWithCache<T>(
    url: string,
    options: RequestInit = {},
    config: RequestConfig = {}
  ): Promise<T> {
    const cacheKey = this.getCacheKey(url, options);
    
    // Check cache first
    if (config.cache !== false) {
      const cached = this.cache.get(cacheKey);
      if (cached && this.isCacheValid(cached)) {
        logger.debug(`Cache hit: ${url}`);
        return cached.data;
      }
    }

    // Check if request is already pending
    if (this.pendingRequests.has(cacheKey)) {
      logger.debug(`Deduplicating request: ${url}`);
      return this.pendingRequests.get(cacheKey)!;
    }

    // Make the request
    const requestPromise = fetch(url, options)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data: T) => {
        // Cache the response
        if (config.cache !== false) {
          const ttl = config.cacheTTL || this.DEFAULT_CACHE_TTL;
          this.cache.set(cacheKey, {
            data,
            timestamp: Date.now(),
            expiry: Date.now() + ttl,
          });
        }
        return data;
      })
      .finally(() => {
        // Remove from pending requests
        this.pendingRequests.delete(cacheKey);
      });

    // Store pending request
    this.pendingRequests.set(cacheKey, requestPromise);

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

    return this.fetchWithCache<T>(url, options, config);
  }

  async post<T>(
    endpoint: string,
    data: any,
    token?: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...config.headers,
      },
      body: JSON.stringify(data),
    };

    // POST requests shouldn't be cached
    return fetch(url, options).then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }
      return response.json();
    });
  }

  async put<T>(
    endpoint: string,
    data: any,
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

  // Clear cache for specific endpoint or all cache
  clearCache(endpoint?: string): void {
    if (endpoint) {
      const prefix = `${API_URL}${endpoint}`;
      for (const key of this.cache.keys()) {
        if (key.startsWith(prefix)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }

  // Clear expired cache entries
  clearExpiredCache(): void {
    for (const [key, entry] of this.cache.entries()) {
      if (!this.isCacheValid(entry)) {
        this.cache.delete(key);
      }
    }
  }
}

export const apiClient = new APIClient();

// Clear expired cache every 10 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    apiClient.clearExpiredCache();
  }, 10 * 60 * 1000);
}
