import React from 'react';
import { render } from '@testing-library/react';
import PricingScreen from '../../../src/screens/pricing/PricingScreen';
import { ThemeContext } from '../../../src/contexts/ThemeContext';
import { AuthContext } from '../../../src/contexts/AuthContext';

// Mock navigation components
jest.mock('../../../src/components/ui/PageHeader', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { View, Text } = require('react-native');
    // eslint-disable-next-line react/display-name
    return ({ title }: { title: string }) => (
        <View data-testid="page-header">
            <Text>{title}</Text>
        </View>
    );
});

describe('PricingScreen', () => {
    const mockNavigate = jest.fn();
    const mockSignOut = jest.fn();

    const renderWithContext = (component: React.ReactNode) => {
        return render(
            <AuthContext.Provider value={{
                user: { id: '1', subscription: 'free' } as any,
                token: 'token',
                signIn: jest.fn(),
                signOut: mockSignOut,
                isAuthenticated: true,
                loading: false,
                error: null,
                register: jest.fn(), // Add missing properties
                updateProfile: jest.fn(),
                changePassword: jest.fn(),
            }}>
                <ThemeContext.Provider value={{
                    theme: 'light',
                    toggleTheme: jest.fn(),
                    isDark: false,
                    userRole: 'landlord',
                    setUserRole: jest.fn(),
                    accentColor: '#000'
                }}>
                    {component}
                </ThemeContext.Provider>
            </AuthContext.Provider>
        );
    };

    it('renders correctly', () => {
        const { getByText } = renderWithContext(
            <PricingScreen onNavigate={mockNavigate} onSignOut={mockSignOut} />
        );

        expect(getByText('Pricing')).toBeTruthy();
        expect(getByText('Choose Your Plan')).toBeTruthy();
    });

    it('displays pricing table text', () => {
        const { getByText } = renderWithContext(
            <PricingScreen onNavigate={mockNavigate} onSignOut={mockSignOut} />
        );

        expect(getByText('Select the perfect plan for your property management needs')).toBeTruthy();
    });
});
