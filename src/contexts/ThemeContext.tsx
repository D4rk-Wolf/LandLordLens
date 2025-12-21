import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type UserRole = 'landlord' | 'tenant' | 'manager' | 'admin';

interface ThemeContextType {
    theme: Theme;
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
    const [userRole, setUserRole] = useState<UserRole>('landlord');

    useEffect(() => {
        // Load theme from localStorage
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
            applyTheme(savedTheme);
        }

        // Load user role from localStorage
        const savedRole = localStorage.getItem('userRole') as UserRole;
        if (savedRole) {
            setUserRole(savedRole);
            applyRoleAccent(savedRole);
        }
    }, []);

    const applyTheme = (newTheme: Theme) => {
        const root = document.documentElement;

        if (newTheme === 'dark') {
            // Dark theme colors
            root.style.setProperty('--bg-primary', 'hsl(222, 47%, 11%)');
            root.style.setProperty('--bg-secondary', 'hsl(217, 33%, 17%)');
            root.style.setProperty('--bg-tertiary', 'hsl(215, 28%, 24%)');
            root.style.setProperty('--text-primary', 'hsl(210, 40%, 98%)');
            root.style.setProperty('--text-secondary', 'hsl(215, 20%, 65%)');
            root.style.setProperty('--border-color', 'hsl(217, 33%, 25%)');
        } else {
            // Light theme colors
            root.style.setProperty('--bg-primary', 'hsl(0, 0%, 100%)');
            root.style.setProperty('--bg-secondary', 'hsl(210, 40%, 98%)');
            root.style.setProperty('--bg-tertiary', 'hsl(214, 32%, 91%)');
            root.style.setProperty('--text-primary', 'hsl(222, 47%, 11%)');
            root.style.setProperty('--text-secondary', 'hsl(215, 16%, 47%)');
            root.style.setProperty('--border-color', 'hsl(214, 32%, 91%)');
        }
    };

    const applyRoleAccent = (role: UserRole) => {
        const root = document.documentElement;
        const accentColor = ROLE_COLORS[role];

        // Set the primary color based on role
        root.style.setProperty('--primary', accentColor);
        root.style.setProperty('--primary-gradient', `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)`);

        // Store role in localStorage
        localStorage.setItem('userRole', role);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const handleSetUserRole = (role: UserRole) => {
        setUserRole(role);
        applyRoleAccent(role);
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
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
