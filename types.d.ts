// types.d.ts

/**
 * Represents the configuration options for the jsonCache.
 */
interface JsonCacheConfig {
    /**
     * Time To Live (TTL) for cache entries in milliseconds. Defaults to 300,000ms (5 minutes).
     */
    ttl?: number;

    /**
     * Minimum TTL for cache entries in milliseconds. Defaults to 60,000ms (1 minute).
     */
    min?: number;

    /**
     * Interval for the autoclean process in milliseconds. Defaults to 15,000ms (15 seconds).
     */
    clean?: number;
}

/**
 * Interface for the JsonCacheInterface class.
 * Provides methods and properties for managing JSON caching.
 */
interface JsonCacheInterface {
    /**
     * Clears the cache storage.
     */
    clear(): void;

    /**
     * Retrieves the cache settings.
     * @returns The current cache settings.
     */
    settings: Object;

    /**
     * Asynchronously fetches JSON data with caching support.
     * @param data The data needed for fetching JSON, including URL and cache settings.
     * @returns A promise that resolves to the fetched JSON data or undefined on failure.
     */
    getJson(data: { url: string; ttl?: number; dynamic?: boolean }): Promise<Object | undefined>;
}

/**
 * Declares the jsonCache function.
 *
 * This function configures and returns a caching instance designed for JSON data, based on provided settings.
 * It supports custom configurations for TTL, minimum TTL, and autoclean interval.
 * If the cache instance does not exist, it initializes a new one with the given configuration.
 * Otherwise, it returns the existing instance.
 *
 * @param config Optional configuration settings for the cache instance.
 * @returns The initialized or existing JsonCacheInterface instance.
 */
export function jsonCache(config?: JsonCacheConfig): JsonCacheInterface;
