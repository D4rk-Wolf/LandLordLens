import { useEffect } from 'react';

interface KeyboardShortcut {
    key: string;
    ctrl?: boolean;
    meta?: boolean;
    shift?: boolean;
    alt?: boolean;
    action: () => void;
    description: string;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            for (const shortcut of shortcuts) {
                const ctrlMatch = shortcut.ctrl ? e.ctrlKey || e.metaKey : !e.ctrlKey && !e.metaKey;
                const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey;
                const altMatch = shortcut.alt ? e.altKey : !e.altKey;
                const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();

                if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
                    e.preventDefault();
                    shortcut.action();
                    break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [shortcuts]);
};

// Common shortcuts
export const createCommonShortcuts = (actions: {
    onSearch?: () => void;
    onNewProperty?: () => void;
    onSettings?: () => void;
    onHelp?: () => void;
}): KeyboardShortcut[] => {
    const shortcuts: KeyboardShortcut[] = [];

    if (actions.onSearch) {
        shortcuts.push({
            key: 'k',
            ctrl: true,
            action: actions.onSearch,
            description: 'Open search',
        });
    }

    if (actions.onNewProperty) {
        shortcuts.push({
            key: 'n',
            ctrl: true,
            action: actions.onNewProperty,
            description: 'New property',
        });
    }

    if (actions.onSettings) {
        shortcuts.push({
            key: ',',
            ctrl: true,
            action: actions.onSettings,
            description: 'Open settings',
        });
    }

    if (actions.onHelp) {
        shortcuts.push({
            key: '?',
            shift: true,
            action: actions.onHelp,
            description: 'Show help',
        });
    }

    return shortcuts;
};
