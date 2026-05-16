// Search utilities for fuzzy searching across different data types

export interface SearchableItem {
    _id: string;
    [key: string]: unknown;
}

export interface SearchResult<T> {
    item: T;
    score: number;
    matchedFields: string[];
}

/**
 * Fuzzy search implementation
 * Searches for query string within item fields and returns matches with scores
 */
export const fuzzySearch = <T extends SearchableItem>(
    items: T[],
    query: string,
    searchFields: (keyof T)[]
): SearchResult<T>[] => {
    if (!query || query.trim() === '') {
        return [];
    }

    const lowerQuery = query.toLowerCase().trim();
    const results: SearchResult<T>[] = [];

    items.forEach(item => {
        let score = 0;
        const matchedFields: string[] = [];

        searchFields.forEach(field => {
            const fieldValue = String(item[field] || '').toLowerCase();

            if (fieldValue.includes(lowerQuery)) {
                // Exact match gets higher score
                if (fieldValue === lowerQuery) {
                    score += 100;
                }
                // Starts with query gets medium score
                else if (fieldValue.startsWith(lowerQuery)) {
                    score += 50;
                }
                // Contains query gets lower score
                else {
                    score += 25;
                }

                matchedFields.push(String(field));
            }
        });

        if (score > 0) {
            results.push({ item, score, matchedFields });
        }
    });

    // Sort by score descending
    return results.sort((a, b) => b.score - a.score);
};

/**
 * Highlight matching text in a string
 */
export const highlightMatch = (text: string, query: string): string => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
};

/**
 * Debounce function for search input
 */
export const debounce = <F extends (...args: unknown[]) => unknown>(
    func: F,
    wait: number
): ((...args: Parameters<F>) => void) => {
    let timeout: NodeJS.Timeout;

    return (...args: Parameters<F>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};
