import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PageHeader from '../../components/ui/PageHeader';

interface PricingScreenProps {
    onNavigate: (screen: string) => void;
    onSignOut: () => void;
}

const PricingScreen: React.FC<PricingScreenProps> = ({ onNavigate, onSignOut }) => {


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
                    {(!process.env.STRIPE_PRICING_TABLE_ID || !process.env.STRIPE_PUBLISHABLE_KEY) ? (
                        <View style={styles.configError}>
                            <Text style={styles.configErrorTitle}>Configuration Required</Text>
                            <Text style={styles.configErrorText}>
                                Stripe pricing table ID or publishable key is missing.
                                Please check your environment variables.
                            </Text>
                        </View>
                    ) : (
                        // @ts-ignore - Stripe custom element
                        <stripe-pricing-table
                            pricing-table-id={process.env.STRIPE_PRICING_TABLE_ID}
                            publishable-key={process.env.STRIPE_PUBLISHABLE_KEY}
                        />
                    )}
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
    configError: {
        padding: 40,
        backgroundColor: '#fef2f2',
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fee2e2',
    },
    configErrorTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#991b1b',
        marginBottom: 8,
    },
    configErrorText: {
        color: '#b91c1c',
        textAlign: 'center',
    },
});

export default PricingScreen;
