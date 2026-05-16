import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

interface AnalyticsData {
    valuation: {
        total: number;
        equity: number;
        ltv: number;
    };
    performance: {
        annualGrossRent: number;
        operatingExpense: number;
        netOperatingIncome: number;
        grossYield: number;
        netYield: number;
    };
}

const PortfolioScreen: React.FC = () => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchAnalytics = React.useCallback(async () => {
        try {
            const response = await fetch('/api/analytics/portfolio', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch analytics');
            const json = await response.json();
            setData(json);
        } catch (err) {
            setError('Could not load portfolio data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(amount);
    };

    if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#6366F1" /></View>;
    if (error) return <View style={styles.center}><Text style={styles.errorText}>{error}</Text></View>;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Portfolio Intelligence</Text>
                <TouchableOpacity style={styles.refreshButton} onPress={fetchAnalytics}>
                    <Text style={styles.refreshText}>↻ Refresh</Text>
                </TouchableOpacity>
            </View>

            {/* Valuation Cards */}
            <View style={styles.row}>
                <Card title="Portfolio Value" value={formatCurrency(data?.valuation.total || 0)} subtext="Live Market Estimate" color="#10B981" />
                <Card title="Net Equity" value={formatCurrency(data?.valuation.equity || 0)} subtext={`${data?.valuation.ltv}% Loan-to-Value`} color="#3B82F6" />
            </View>

            {/* Performance Cards */}
            <Text style={styles.sectionTitle}>Financial Performance (Trailing 12m)</Text>
            <View style={styles.row}>
                <Card title="Net Operating Income" value={formatCurrency(data?.performance.netOperatingIncome || 0)} subtext="Revenue - Opex" color="#8B5CF6" />
                <Card title="Net Yield" value={`${data?.performance.netYield}%`} subtext="Based on Current Value" color="#F59E0B" />
            </View>

            <View style={styles.detailsCard}>
                <Text style={styles.cardTitle}>Breakdown</Text>
                <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>Annual Gross Rent</Text>
                    <Text style={styles.tableValue}>{formatCurrency(data?.performance.annualGrossRent || 0)}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>Operating Expenses</Text>
                    <Text style={styles.tableValueRed}>-{formatCurrency(data?.performance.operatingExpense || 0)}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.tableRow}>
                    <Text style={styles.tableLabelBold}>Net Operating Income</Text>
                    <Text style={styles.tableValueBold}>{formatCurrency(data?.performance.netOperatingIncome || 0)}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const Card = ({ title, value, subtext, color }: { title: string, value: string, subtext: string, color: string }) => (
    <View style={[styles.card, { borderTopColor: color }]}>
        <Text style={styles.cardLabel}>{title}</Text>
        <Text style={[styles.cardValue, { color }]}>{value}</Text>
        <Text style={styles.cardSubtext}>{subtext}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f3f4f6' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#111827' },
    refreshButton: { padding: 8, backgroundColor: '#e5e7eb', borderRadius: 8 },
    refreshText: { fontSize: 14, color: '#374151' },
    sectionTitle: { fontSize: 18, fontWeight: '600', color: '#4B5563', marginTop: 24, marginBottom: 12 },
    row: { flexDirection: 'row', gap: 16, flexWrap: 'wrap' },
    card: {
        flex: 1,
        minWidth: 300,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        borderTopWidth: 4,
        boxShadow: '0 10px 10px rgba(0, 0, 0, 0.05)',
        marginBottom: 16
    },
    cardLabel: { fontSize: 14, color: '#6B7280', marginBottom: 8 },
    cardValue: { fontSize: 32, fontWeight: 'bold', marginBottom: 4 },
    cardSubtext: { fontSize: 12, color: '#9CA3AF' },
    errorText: { color: '#EF4444', fontSize: 16 },
    detailsCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginTop: 16 },
    cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#111827' },
    tableRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    tableLabel: { fontSize: 15, color: '#4B5563' },
    tableValue: { fontSize: 15, fontWeight: '500', color: '#111827' },
    tableValueRed: { fontSize: 15, fontWeight: '500', color: '#EF4444' },
    divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 12 },
    tableLabelBold: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
    tableValueBold: { fontSize: 16, fontWeight: 'bold', color: '#10B981' }
});

export default PortfolioScreen;
