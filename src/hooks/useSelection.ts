import { useState, useCallback } from 'react';

export interface SelectableItem {
    _id: string;
}

export interface UseSelectionReturn<T extends SelectableItem> {
    selectedIds: Set<string>;
    isSelectionMode: boolean;
    selectedCount: number;
    setIsSelectionMode: (mode: boolean) => void;
    toggleSelection: (id: string) => void;
    selectAll: (items: T[]) => void;
    clearSelection: () => void;
    isSelected: (id: string) => boolean;
    getSelectedItems: (items: T[]) => T[];
}

export const useSelection = <T extends SelectableItem>(): UseSelectionReturn<T> => {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isSelectionMode, setIsSelectionMode] = useState(false);

    const toggleSelection = useCallback((id: string) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            // Exit selection mode if no items selected
            if (newSet.size === 0) {
                setIsSelectionMode(false);
            }
            return newSet;
        });
    }, []);

    const selectAll = useCallback((items: T[]) => {
        setSelectedIds(new Set(items.map(item => item._id)));
        setIsSelectionMode(true);
    }, []);

    const clearSelection = useCallback(() => {
        setSelectedIds(new Set());
        setIsSelectionMode(false);
    }, []);

    const isSelected = useCallback((id: string) => {
        return selectedIds.has(id);
    }, [selectedIds]);

    const getSelectedItems = useCallback((items: T[]) => {
        return items.filter(item => selectedIds.has(item._id));
    }, [selectedIds]);

    return {
        selectedIds,
        isSelectionMode,
        selectedCount: selectedIds.size,
        setIsSelectionMode,
        toggleSelection,
        selectAll,
        clearSelection,
        isSelected,
        getSelectedItems,
    };
};
