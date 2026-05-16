import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type ThemeMode = 'light' | 'dark' | 'auto';
type UserRole = 'landlord' | 'tenant' | 'manager' | 'admin';

interface ThemeContextType {
    theme: Theme;
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    toggleTheme: () => void;
    userRole: UserRole;
    setUserRole: (role: UserRole) => void;
    accentColor: string;
    isDark: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Role-specific color mappings
const ROLE_COLORS: Record<UserRole, string> = {
    landlord: 'hsl(220, 90%, 56%)',    // Primary blue
    tenant: 'hsl(142, 71%, 45%)',       // Success green
    manager: 'hsl(271, 76%, 53%)',      // Purple
    admin: 'hsl(0, 84%, 60%)',          // Danger red
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Lazy initialization for state
    const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
        try {
            const savedMode = localStorage.getItem('themeMode') as ThemeMode;
            if (savedMode) return savedMode;
            // Migration fallback
            const savedTheme = localStorage.getItem('theme') as Theme;
            return savedTheme || 'light';
        } catch {
            return 'light';
        }
    });

    const [userRole, setUserRoleState] = useState<UserRole>(() => {
        try {
            return (localStorage.getItem('userRole') as UserRole) || 'landlord';
        } catch {
            return 'landlord';
        }
    });

    const [systemTheme, setSystemTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    });

    // Derived state
    const theme: Theme = themeMode === 'auto' ? systemTheme : (themeMode as Theme);

    // Effect to handle system theme changes
    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            setSystemTheme(e.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Effect to sync theme to DOM and storage
    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        localStorage.setItem('themeMode', themeMode);
    }, [theme, themeMode]);

    // Effect to sync user role to CSS variables
    useEffect(() => {
        const root = document.documentElement;
        const accentColor = ROLE_COLORS[userRole];
        root.style.setProperty('--primary', accentColor);
        root.style.setProperty('--primary-gradient', `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)`);
        localStorage.setItem('userRole', userRole);
    }, [userRole]);

    const setThemeMode = useCallback((mode: ThemeMode) => {
        setThemeModeState(mode);
    }, []);

    const toggleTheme = useCallback(() => {
        // Cycle: light -> dark -> auto -> light
        if (themeMode === 'light') setThemeModeState('dark');
        else if (themeMode === 'dark') setThemeModeState('auto');
        else setThemeModeState('light');
    }, [themeMode]);

    const setUserRole = useCallback((role: UserRole) => {
        setUserRoleState(role);
    }, []);

    const value = useMemo(
        () => ({
            theme,
            themeMode,
            setThemeMode,
            toggleTheme,
            userRole,
            setUserRole,
            accentColor: ROLE_COLORS[userRole],
            isDark: theme === 'dark',
        }),
        [theme, themeMode, setThemeMode, toggleTheme, userRole, setUserRole]
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
