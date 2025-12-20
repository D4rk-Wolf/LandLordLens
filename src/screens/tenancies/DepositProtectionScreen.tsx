import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';
import PageHeader from '../../components/ui/PageHeader';

interface DepositProtectionScreenProps {
  tenancyId: string;
  onNavigate: (screen: string) => void;
  onBack: () => void;
  onSignOut: () => void;
}

const DepositProtectionScreen: React.FC<DepositProtectionScreenProps> = ({
  tenancyId,
  onNavigate,
  onBack,
  onSignOut,
}) => {
  const { token } = useAuth();
  const [depositProtection, setDepositProtection] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    depositAmount: '',
    scheme: 'dps',
    protectionReference: '',
    protectedDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const fetchDepositProtection = useCallback(async () => {
    if (!token) return;

    try {
      const data = await apiClient.get<any>(
        `/tenancies/${tenancyId}`,
        token,
        { cache: true, cacheTTL: 2 * 60 * 1000 }
      );
      if (data.depositProtection) {
        setDepositProtection(data.depositProtection);
        setFormData({
          depositAmount: data.depositProtection.depositAmount?.toString() || '',
          scheme: data.depositProtection.scheme || 'dps',
          protectionReference: data.depositProtection.protectionReference || '',
          protectedDate: data.depositProtection.protectedDate
            ? new Date(data.depositProtection.protectedDate).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
          notes: data.depositProtection.notes || '',
        });
      }
    } catch (error) {
      logger.error('Error fetching deposit protection', error);
    } finally {
      setLoading(false);
    }
  }, [tenancyId, token]);

  useEffect(() => {
    fetchDepositProtection();
  }, [fetchDepositProtection]);

  const handleSave = async () => {
    try {
      await apiClient.post(
        `/tenancies/${tenancyId}/deposit-protection`,
        {
          ...formData,
          depositAmount: parseFloat(formData.depositAmount),
          protectedDate: new Date(formData.protectedDate),
        },
        token
      );

      Alert.alert('Success', 'Deposit protection record saved');
      await fetchDepositProtection();
      setEditing(false);
    } catch (error: any) {
      logger.error('Error saving deposit protection', error);
      Alert.alert('Error', error.message || 'Failed to save deposit protection');
    }
  };

  const schemes = [
    { value: 'dps', label: 'Deposit Protection Service (DPS)' },
    { value: 'mydeposits', label: 'MyDeposits' },
    { value: 'tds', label: 'Tenancy Deposit Scheme (TDS)' },
    { value: 'lps_scotland', label: 'Letting Protection Service Scotland' },
    { value: 'safedeposits_scotland', label: 'Safedeposits Scotland' },
    { value: 'mydeposits_scotland', label: 'My|Deposits Scotland' },
    { value: 'tds_ni', label: 'TDS Northern Ireland' },
    { value: 'mydeposits_ni', label: 'My|Deposits Northern Ireland' },
    { value: 'lps_ni', label: 'Letting Protection Service NI' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Deposit Protection</Text>
        {depositProtection && !editing && (
          <TouchableOpacity onPress={() => setEditing(true)} style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      {depositProtection && !editing ? (
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Protection Details</Text>
              <View style={[styles.statusBadge, { backgroundColor: '#d1fae5' }]}>
                <Text style={[styles.statusText, { color: '#059669' }]}>
                  {depositProtection.status === 'protected' ? 'Protected' : depositProtection.status}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Deposit Amount</Text>
              <Text style={styles.value}>£{depositProtection.depositAmount?.toFixed(2)}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Protection Scheme</Text>
              <Text style={styles.value}>
                {schemes.find(s => s.value === depositProtection.scheme)?.label || depositProtection.scheme}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Protection Reference</Text>
              <Text style={styles.value}>{depositProtection.protectionReference}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Protected Date</Text>
              <Text style={styles.value}>
                {new Date(depositProtection.protectedDate).toLocaleDateString()}
              </Text>
            </View>

            {depositProtection.notes && (
              <View style={styles.notesContainer}>
                <Text style={styles.label}>Notes</Text>
                <Text style={styles.notes}>{depositProtection.notes}</Text>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Deposit Protection Information</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Deposit Amount (£)</Text>
              <TextInput
                style={styles.input}
                value={formData.depositAmount}
                onChangeText={(text) => setFormData({ ...formData, depositAmount: text })}
                keyboardType="numeric"
                placeholder="0.00"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Protection Scheme</Text>
              <ScrollView style={styles.schemeList}>
                {schemes.map((scheme) => (
                  <TouchableOpacity
                    key={scheme.value}
                    style={[
                      styles.schemeOption,
                      formData.scheme === scheme.value && styles.schemeOptionSelected,
                    ]}
                    onPress={() => setFormData({ ...formData, scheme: scheme.value })}
                  >
                    <Text
                      style={[
                        styles.schemeOptionText,
                        formData.scheme === scheme.value && styles.schemeOptionTextSelected,
                      ]}
                    >
                      {scheme.label}
                    </Text>
                    {formData.scheme === scheme.value && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Protection Reference Number</Text>
              <TextInput
                style={styles.input}
                value={formData.protectionReference}
                onChangeText={(text) => setFormData({ ...formData, protectionReference: text })}
                placeholder="Enter reference number"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Protected Date</Text>
              <TextInput
                style={styles.input}
                value={formData.protectedDate}
                onChangeText={(text) => setFormData({ ...formData, protectedDate: text })}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.notes}
                onChangeText={(text) => setFormData({ ...formData, notes: text })}
                multiline
                numberOfLines={4}
                placeholder="Additional notes..."
              />
            </View>

            <View style={styles.buttonRow}>
              {editing && (
                <TouchableOpacity
                  onPress={() => {
                    setEditing(false);
                    fetchDepositProtection();
                  }}
                  style={[styles.button, styles.cancelButton]}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={handleSave} style={[styles.button, styles.saveButton]}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  backButton: {
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
  },
  backButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  editButton: {
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#e0e7ff',
  },
  editButtonText: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  notesContainer: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  notes: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  schemeList: {
    maxHeight: 200,
  },
  schemeOption: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  schemeOptionSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#f0f4ff',
  },
  schemeOptionText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  schemeOptionTextSelected: {
    color: '#6366f1',
    fontWeight: '600',
  },
  checkmark: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#6366f1',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DepositProtectionScreen;
