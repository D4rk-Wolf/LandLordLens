import { useState, useCallback, useMemo } from 'react';

export interface FilterOption {
    label: string;
    value: string | number | boolean;
}

export interface FilterConfig {
    [key: string]: {
        type: 'select' | 'multiselect' | 'range' | 'date' | 'boolean';
        label: string;
        options?: FilterOption[];
        min?: number;
        max?: number;
    };
}

export interface ActiveFilters {
    [key: string]: any;
}

export interface SortConfig {
    field: string;
    order: 'asc' | 'desc';
}

export interface UseFiltersReturn<T> {
    activeFilters: ActiveFilters;
    sortConfig: SortConfig | null;
    setFilter: (key: string, value: any) => void;
    clearFilter: (key: string) => void;
    clearAllFilters: () => void;
    setSort: (field: string, order: 'asc' | 'desc') => void;
    clearSort: () => void;
    filteredData: T[];
    filterCount: number;
}

export const useFilters = <T extends Record<string, any>>(
    data: T[],
    filterConfig: FilterConfig
): UseFiltersReturn<T> => {
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

    const setFilter = useCallback((key: string, value: any) => {
        setActiveFilters(prev => {
            if (value === null || value === undefined || value === '' ||
                (Array.isArray(value) && value.length === 0)) {
                const newFilters = { ...prev };
                delete newFilters[key];
                return newFilters;
            }
            return { ...prev, [key]: value };
        });
    }, []);

    const clearFilter = useCallback((key: string) => {
        setActiveFilters(prev => {
            const newFilters = { ...prev };
            delete newFilters[key];
            return newFilters;
        });
    }, []);

    const clearAllFilters = useCallback(() => {
        setActiveFilters({});
    }, []);

    const setSort = useCallback((field: string, order: 'asc' | 'desc') => {
        setSortConfig({ field, order });
    }, []);

    const clearSort = useCallback(() => {
        setSortConfig(null);
    }, []);

    const filteredData = useMemo(() => {
        let result = [...data];

        // Apply filters
        Object.entries(activeFilters).forEach(([key, value]) => {
            const config = filterConfig[key];
            if (!config) return;

            switch (config.type) {
                case 'select':
                    result = result.filter(item => item[key] === value);
                    break;

                case 'multiselect':
                    if (Array.isArray(value) && value.length > 0) {
                        result = result.filter(item => value.includes(item[key]));
                    }
                    break;

                case 'range':
                    if (value.min !== undefined) {
                        result = result.filter(item => item[key] >= value.min);
                    }
                    if (value.max !== undefined) {
                        result = result.filter(item => item[key] <= value.max);
                    }
                    break;

                case 'date':
                    if (value.start) {
                        result = result.filter(item => new Date(item[key]) >= new Date(value.start));
                    }
                    if (value.end) {
                        result = result.filter(item => new Date(item[key]) <= new Date(value.end));
                    }
                    break;

                case 'boolean':
                    result = result.filter(item => item[key] === value);
                    break;
            }
        });

        // Apply sorting
        if (sortConfig) {
            result.sort((a, b) => {
                const aVal = a[sortConfig.field];
                const bVal = b[sortConfig.field];

                if (aVal === bVal) return 0;

                const comparison = aVal > bVal ? 1 : -1;
                return sortConfig.order === 'asc' ? comparison : -comparison;
            });
        }

        return result;
    }, [data, activeFilters, sortConfig, filterConfig]);

    const filterCount = Object.keys(activeFilters).length;

    return {
        activeFilters,
        sortConfig,
        setFilter,
        clearFilter,
        clearAllFilters,
        setSort,
        clearSort,
        filteredData,
        filterCount,
    };
};
