import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { fuzzySearch, SearchResult } from '../utils/search';

interface SearchContextType {
    query: string;
    setQuery: (q: string) => void;
    results: SearchResult[];
    isSearching: boolean;
    isSearchOpen: boolean;
    openSearch: () => void;
    closeSearch: () => void;
    search: (query: string, items: any[], fields: string[]) => void;
    clearResults: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const search = useCallback((searchQuery: string, items: any[], fields: string[]) => {
        setIsSearching(true);
        setQuery(searchQuery);

        try {
            const searchResults = fuzzySearch(items, searchQuery, fields);
            setResults(searchResults);
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setIsSearching(false);
        }
    }, []);

    const clearResults = useCallback(() => {
        setQuery('');
        setResults([]);
    }, []);

    const openSearch = useCallback(() => {
        setIsSearchOpen(true);
    }, []);

    const closeSearch = useCallback(() => {
        setIsSearchOpen(false);
        clearResults();
    }, [clearResults]);

    return (
        <SearchContext.Provider
            value={{
                query,
                setQuery,
                results,
                isSearching,
                isSearchOpen,
                openSearch,
                closeSearch,
                search,
                clearResults,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = (): SearchContextType => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};
