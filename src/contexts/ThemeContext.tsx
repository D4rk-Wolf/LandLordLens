import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
    const [theme, setTheme] = useState<Theme>('light');
    const [themeMode, setThemeModeState] = useState<ThemeMode>('light');
    const [userRole, setUserRole] = useState<UserRole>('landlord');

    useEffect(() => {
        // Load theme from localStorage
        const savedMode = localStorage.getItem('themeMode') as ThemeMode;
        if (savedMode) {
            setThemeModeState(savedMode);
        } else {
            // Fallback to existing 'theme' if 'themeMode' not set (migration)
            const savedTheme = localStorage.getItem('theme') as Theme;
            if (savedTheme) {
                setThemeModeState(savedTheme);
            }
        }

        // Load user role from localStorage
        const savedRole = localStorage.getItem('userRole') as UserRole;
        if (savedRole) {
            setUserRole(savedRole);
            applyRoleAccent(savedRole);
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        let activeTheme: Theme = 'light';

        if (themeMode === 'auto') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            activeTheme = systemTheme;
        } else {
            activeTheme = themeMode;
        }

        setTheme(activeTheme);
        root.setAttribute('data-theme', activeTheme);
        localStorage.setItem('themeMode', themeMode);

        // Listen for system changes if mode is auto
        if (themeMode === 'auto') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = (e: MediaQueryListEvent) => {
                const newSystemTheme = e.matches ? 'dark' : 'light';
                setTheme(newSystemTheme);
                root.setAttribute('data-theme', newSystemTheme);
            };
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [themeMode]);

    const applyRoleAccent = (role: UserRole) => {
        const root = document.documentElement;
        const accentColor = ROLE_COLORS[role];

        // Set the primary color based on role
        root.style.setProperty('--primary', accentColor);
        root.style.setProperty('--primary-gradient', `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)`);

        // Store role in localStorage
        localStorage.setItem('userRole', role);
    };

    const setThemeMode = (mode: ThemeMode) => {
        setThemeModeState(mode);
    };

    const toggleTheme = () => {
        // Cycle: light -> dark -> auto -> light
        if (themeMode === 'light') setThemeMode('dark');
        else if (themeMode === 'dark') setThemeMode('auto');
        else setThemeMode('light');
    };

    const handleSetUserRole = (role: UserRole) => {
        setUserRole(role);
        applyRoleAccent(role);
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                themeMode,
                setThemeMode,
                toggleTheme,
                userRole,
                setUserRole: handleSetUserRole,
                accentColor: ROLE_COLORS[userRole],
                isDark: theme === 'dark',
            }}
        >
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
