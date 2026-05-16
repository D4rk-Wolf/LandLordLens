import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { apiClient } from '../../utils/api-client';
import PageHeader from '../../components/ui/PageHeader';
import { logger } from '../../utils/logger';

interface UseSubscription {
    currentTier: string;
    tierDetails: {
        name: string;
        description: string;
        price: {
            monthly: number;
            yearly: number;
        }
    }
}

const PricingScreen: React.FC = () => {
    const { token } = useAuth(); // Assuming useAuth provides token
    const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');
    const [loading, setLoading] = useState(false);

    // Hardcoded tiers for now, aligning with STRIPE_SETUP.md
    const tiers = [
        {
            id: 'professional',
            name: 'Professional',
            description: 'Up to 10 properties',
            price: { monthly: 12, yearly: 120 },
            features: ['10 Properties', '5GB Storage', 'Basic Support'],
            bestValue: false
        },
        {
            id: 'business',
            name: 'Business',
            description: 'Up to 50 properties',
            price: { monthly: 29, yearly: 290 },
            features: ['50 Properties', '50GB Storage', 'Priority Support', '5 Users'],
            bestValue: true
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            description: 'Unlimited properties',
            price: { monthly: 99, yearly: 990 },
            features: ['Unlimited Properties', 'Unlimited Storage', '24/7 Support', 'Dedicated Manager'],
            bestValue: false
        }
    ];

    const handleSubscribe = async (tierId: string) => {
        setLoading(true);
        try {
            const { url } = await apiClient.post<{ url: string }>(
                '/subscription/create-checkout-session',
                { tier: tierId, period },
                token || undefined
            );

            if (url) {
                // Redirect to Stripe Checkout
                if (Platform.OS === 'web') {
                    window.location.href = url;
                } else {
                    // For native, we would open a browser
                    Alert.alert('Redirect', 'Please complete payment in the browser.', [
                        { text: 'Open', onPress: () => console.log('Open browser', url) }
                    ]);
                }
            }
        } catch (error) {
            logger.error('Checkout error', error);
            Alert.alert('Error', 'Failed to start checkout process');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <PageHeader title="Upgrade Your Plan" />
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Toggle Monthly/Yearly */}
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[styles.toggleButton, period === 'monthly' && styles.toggleActive]}
                        onPress={() => setPeriod('monthly')}
                    >
                        <Text style={[styles.toggleText, period === 'monthly' && styles.toggleTextActive]}>Monthly</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleButton, period === 'yearly' && styles.toggleActive]}
                        onPress={() => setPeriod('yearly')}
                    >
                        <Text style={[styles.toggleText, period === 'yearly' && styles.toggleTextActive]}>Yearly (Save 17%)</Text>
                    </TouchableOpacity>
                </View>

                {/* Pricing Cards */}
                <View style={styles.cardsContainer}>
                    {tiers.map((tier) => (
                        <View key={tier.id} style={[styles.card, tier.bestValue && styles.cardBestValue]}>
                            {tier.bestValue && <View style={styles.badge}><Text style={styles.badgeText}>Best Value</Text></View>}

                            <Text style={styles.tierName}>{tier.name}</Text>
                            <Text style={styles.tierDescription}>{tier.description}</Text>

                            <View style={styles.priceContainer}>
                                <Text style={styles.priceSymbol}>£</Text>
                                <Text style={styles.priceValue}>{period === 'monthly' ? tier.price.monthly : tier.price.yearly}</Text>
                                <Text style={styles.pricePeriod}>/{period === 'monthly' ? 'mo' : 'yr'}</Text>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.features}>
                                {tier.features.map((feature, i) => (
                                    <Text key={i} style={styles.featureItem}>✓ {feature}</Text>
                                ))}
                            </View>

                            <TouchableOpacity
                                style={[styles.subscribeButton, tier.bestValue && styles.subscribeButtonBest]}
                                onPress={() => handleSubscribe(tier.id)}
                                disabled={loading}
                            >
                                <Text style={[styles.subscribeText, tier.bestValue && styles.subscribeTextBest]}>
                                    {loading ? 'Processing...' : 'Subscribe'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollContent: {
        padding: 20,
        alignItems: 'center',
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#e2e8f0',
        borderRadius: 8,
        padding: 4,
        marginBottom: 30,
    },
    toggleButton: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 6,
    },
    toggleActive: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748b',
    },
    toggleTextActive: {
        color: '#0f172a',
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        justifyContent: 'center',
        width: '100%',
        maxWidth: 1200,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        width: 300,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
    },
    cardBestValue: {
        borderColor: '#3b82f6',
        borderWidth: 2,
        transform: [{ scale: 1.02 }],
    },
    badge: {
        position: 'absolute',
        top: -12,
        alignSelf: 'center',
        backgroundColor: '#3b82f6',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 999,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    tierName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 4,
    },
    tierDescription: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 20,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 24,
    },
    priceSymbol: {
        fontSize: 20,
        fontWeight: '600',
        color: '#0f172a',
        marginRight: 2,
    },
    priceValue: {
        fontSize: 40,
        fontWeight: '800',
        color: '#0f172a',
    },
    pricePeriod: {
        fontSize: 16,
        color: '#64748b',
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginBottom: 24,
    },
    features: {
        gap: 12,
        marginBottom: 24,
        flex: 1,
    },
    featureItem: {
        fontSize: 14,
        color: '#334155',
    },
    subscribeButton: {
        backgroundColor: '#f1f5f9',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    subscribeButtonBest: {
        backgroundColor: '#3b82f6',
    },
    subscribeText: {
        color: '#0f172a',
        fontWeight: '600',
    },
    subscribeTextBest: {
        color: '#fff',
    },
});

export default PricingScreen;
