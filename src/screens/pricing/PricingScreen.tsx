import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PageHeader from '../../components/ui/PageHeader';

interface PricingScreenProps {
    onNavigate: (screen: string) => void;
    onSignOut: () => void;
}

const PricingScreen: React.FC<PricingScreenProps> = ({ onNavigate, onSignOut }) => {
    useEffect(() => {
        // Load Stripe pricing table script
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/pricing-table.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Cleanup script on unmount
            document.body.removeChild(script);
        };
    }, []);

    return (
        <View style={styles.container}>
            <PageHeader
                title="Pricing"
                onSignOut={onSignOut}
                breadcrumbs={[
                    { label: 'Dashboard', onPress: () => onNavigate('dashboard') },
                    { label: 'Pricing' },
                ]}
            />

            <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Choose Your Plan</Text>
                    <Text style={styles.subtitle}>
                        Select the perfect plan for your property management needs
                    </Text>
                </View>

                <View style={styles.pricingTableContainer}>
                    {/* @ts-ignore - Stripe custom element */}
                    <stripe-pricing-table
                        pricing-table-id="prctbl_1SgqQs1kfPJSO6RCD3s1DodR"
                        publishable-key="pk_live_51SUB6e1kfPJSO6RC94R7V5M4RksGEKn4OMpwfZZfK0GC8tTGnVmk9u5tuXUmve4QrVDNLB3Fmu2Bm9d8EjpO6dqZ00xTkdyiBp"
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        All plans include 14-day free trial • Cancel anytime • No credit card required for trial
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: 32,
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        color: 'var(--text-primary)',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: 'var(--text-secondary)',
        textAlign: 'center',
        maxWidth: 600,
    },
    pricingTableContainer: {
        width: '100%',
        maxWidth: 1200,
        alignSelf: 'center',
        marginBottom: 48,
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 24,
        borderTopWidth: 1,
        borderTopColor: 'var(--gray-200)',
    },
    footerText: {
        fontSize: 14,
        color: 'var(--text-secondary)',
        textAlign: 'center',
    },
});

export default PricingScreen;
