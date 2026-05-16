import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

// Mock Tenancy Selector for MVP (In real app, pass tenancyId as prop or select from list)
// For this screen, we'll assume we are passed a tenancyId via params, or let user pick.
// But to match the Wizard flow, let's make it generic.

const GROUNDS = [
    { id: '1', label: 'Landlord Moving In (Ground 1)', notice: '4 Months' },
    { id: '1A', label: 'Selling Property (Ground 1A)', notice: '4 Months' },
    { id: '8', label: 'Serious Rent Arrears (Ground 8)', notice: '2 Weeks' },
    { id: '14', label: 'Anti-Social Behaviour (Ground 14)', notice: 'Immediate' }
];

const Section8Wizard: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
    const { token } = useAuth();
    const [step, setStep] = useState(1);
    const [tenancies, setTenancies] = useState<any[]>([]);
    const [selectedTenancyId, setSelectedTenancyId] = useState<string>('');
    const [selectedGrounds, setSelectedGrounds] = useState<string[]>([]);
    const [validating, setValidating] = useState(false);
    const [validationResult, setValidationResult] = useState<any>(null);
    const [loadingTenancies, setLoadingTenancies] = useState(true);

    useEffect(() => {
        fetchTenancies();
    }, []);

    const fetchTenancies = async () => {
        try {
            const response = await fetch('/api/tenancies', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.tenancies && data.tenancies.length > 0) {
                setTenancies(data.tenancies);
                setSelectedTenancyId(data.tenancies[0]._id);
            }
        } catch (err) {
            console.error('Failed to load tenancies');
        } finally {
            setLoadingTenancies(false);
        }
    };

    const toggleGround = (id: string) => {
        if (selectedGrounds.includes(id)) {
            setSelectedGrounds(selectedGrounds.filter(g => g !== id));
        } else {
            setSelectedGrounds([...selectedGrounds, id]);
        }
    };

    const runComplianceCheck = async () => {
        if (!selectedTenancyId) {
            Alert.alert('Error', 'No tenancy selected.');
            return;
        }

        setValidating(true);
        try {
            const response = await fetch('/api/legal/section8/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ tenancyId: selectedTenancyId, grounds: selectedGrounds })
            });
            const result = await response.json();
            setValidationResult(result);
            setStep(3);
        } catch (err) {
            Alert.alert('Error', 'Failed to validate compliance.');
        } finally {
            setValidating(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Section 8 Possession Wizard</Text>

            {/* Progress Bar */}
            <View style={styles.progressRow}>
                <View style={[styles.stepDot, step >= 1 && styles.stepActive]}><Text style={styles.stepText}>1</Text></View>
                <View style={[styles.line, step >= 2 && styles.lineActive]} />
                <View style={[styles.stepDot, step >= 2 && styles.stepActive]}><Text style={styles.stepText}>2</Text></View>
                <View style={[styles.line, step >= 3 && styles.lineActive]} />
                <View style={[styles.stepDot, step >= 3 && styles.stepActive]}><Text style={styles.stepText}>3</Text></View>
            </View>

            {step === 1 && (
                <View>
                    <Text style={styles.prompt}>Why do you need possession?</Text>
                    <Text style={styles.subPrompt}>Select all grounds that apply. Renters Rights Act 2025.</Text>

                    {GROUNDS.map(g => (
                        <TouchableOpacity
                            key={g.id}
                            style={[styles.optionCard, selectedGrounds.includes(g.id) && styles.optionSelected]}
                            onPress={() => toggleGround(g.id)}
                        >
                            <Text style={styles.optionTitle}>{g.label}</Text>
                            <Text style={styles.optionSubtitle}>Notice Period: {g.notice}</Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        style={[styles.btnPrimary, selectedGrounds.length === 0 && styles.btnDisabled]}
                        disabled={selectedGrounds.length === 0}
                        onPress={() => setStep(2)}
                    >
                        <Text style={styles.btnText}>Next: Compliance Check</Text>
                    </TouchableOpacity>
                </View>
            )}

            {step === 2 && (
                <View style={styles.centerBox}>
                    <Text style={styles.prompt}>Pre-Flight Compliance Audit</Text>
                    <Text style={styles.desc}>
                        We act as a &quot;Gatekeeper&quot;. Before you can generate a legal notice, we scan your database to ensure
                        all prerequisites (Gas Safety, Deposit Protection, EPC) were valid.
                    </Text>

                    <TouchableOpacity
                        style={styles.btnPrimary}
                        onPress={runComplianceCheck}
                        disabled={validating}
                    >
                        {validating ? <ActivityIndicator color="white" /> : <Text style={styles.btnText}>Run Audit</Text>}
                    </TouchableOpacity>
                </View>
            )}

            {step === 3 && validationResult && (
                <View>
                    {validationResult.isValid ? (
                        <View style={styles.successBox}>
                            <Text style={styles.successTitle}>✅ Compliance Passed</Text>
                            <Text style={styles.text}>You are legally cleared to serve this notice.</Text>
                            <Text style={styles.label}>Earliest Possession Date:</Text>
                            <Text style={styles.date}>{new Date(validationResult.earliestPossessionDate).toDateString()}</Text>

                            <TouchableOpacity style={styles.btnPrimary}>
                                <Text style={styles.btnText}>Generate Form 3 (PDF)</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.errorBox}>
                            <Text style={styles.errorTitle}>⛔ Blocked: Compliance Failure</Text>
                            <Text style={styles.text}>This notice would be invalid in court.</Text>

                            {validationResult.errors.map((e: string, i: number) => (
                                <View key={i} style={styles.errorRow}>
                                    <Text style={styles.errorIcon}>⚠️</Text>
                                    <Text style={styles.errorText}>{e}</Text>
                                </View>
                            ))}

                            <TouchableOpacity style={styles.btnSecondary} onPress={() => onNavigate('compliance')}>
                                <Text style={styles.btnSecondaryText}>Fix Compliance Issues</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: '#f9fafb' },
    header: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 24, textAlign: 'center' },
    progressRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
    stepDot: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center' },
    stepActive: { backgroundColor: '#4F46E5' },
    stepText: { color: 'white', fontWeight: 'bold' },
    line: { width: 40, height: 2, backgroundColor: '#e5e7eb' },
    lineActive: { backgroundColor: '#4F46E5' },
    prompt: { fontSize: 20, fontWeight: '600', color: '#374151', marginBottom: 8 },
    subPrompt: { fontSize: 14, color: '#6B7280', marginBottom: 16 },
    optionCard: { padding: 16, backgroundColor: 'white', borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 12 },
    optionSelected: { borderColor: '#4F46E5', backgroundColor: '#EEF2FF' },
    optionTitle: { fontSize: 16, fontWeight: '600', color: '#111827' },
    optionSubtitle: { fontSize: 14, color: '#6B7280', marginTop: 4 },
    btnPrimary: { backgroundColor: '#4F46E5', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 24 },
    btnDisabled: { backgroundColor: '#9CA3AF' },
    btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    centerBox: { alignItems: 'center', padding: 20 },
    desc: { textAlign: 'center', color: '#4B5563', lineHeight: 24, marginBottom: 24 },
    successBox: { backgroundColor: '#ECFDF5', padding: 20, borderRadius: 8, borderWidth: 1, borderColor: '#10B981' },
    successTitle: { fontSize: 18, fontWeight: 'bold', color: '#065F46', marginBottom: 12 },
    text: { color: '#374151', marginBottom: 12 },
    label: { fontSize: 14, color: '#6B7280' },
    date: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 24 },
    errorBox: { backgroundColor: '#FEF2F2', padding: 20, borderRadius: 8, borderWidth: 1, borderColor: '#EF4444' },
    errorTitle: { fontSize: 18, fontWeight: 'bold', color: '#991B1B', marginBottom: 12 },
    errorRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    errorIcon: { marginRight: 8 },
    errorText: { color: '#B91C1C' },
    btnSecondary: { marginTop: 16, padding: 12, alignItems: 'center' },
    btnSecondaryText: { color: '#4F46E5', fontWeight: '600' }
});

export default Section8Wizard;
