import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

interface RightToRentScreenProps {
  tenancyId: string;
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

const RightToRentScreen: React.FC<RightToRentScreenProps> = ({
  tenancyId,
  onNavigate,
  onBack,
}) => {
  const { token } = useAuth();
  const [checks, setChecks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tenantName: '',
    tenantDateOfBirth: '',
    documentType: 'uk_passport',
    documentNumber: '',
    expiryDate: '',
    notes: '',
  });

  const fetchRightToRent = useCallback(async () => {
    if (!token) return;

    try {
      const data = await apiClient.get<any>(
        `/tenancies/${tenancyId}`,
        token,
        { cache: true, cacheTTL: 2 * 60 * 1000 }
      );
      setChecks(data.rightToRent || []);
    } catch (error) {
      logger.error('Error fetching right to rent', error);
    } finally {
      setLoading(false);
    }
  }, [tenancyId, token]);

  useEffect(() => {
    fetchRightToRent();
  }, [fetchRightToRent]);

  const handleSave = async () => {
    try {
      await apiClient.post(
        `/tenancies/${tenancyId}/right-to-rent`,
        {
          ...formData,
          tenantDateOfBirth: new Date(formData.tenantDateOfBirth),
          expiryDate: formData.expiryDate ? new Date(formData.expiryDate) : null,
        },
        token
      );

      Alert.alert('Success', 'Right to rent check saved');
      await fetchRightToRent();
      setShowForm(false);
      setFormData({
        tenantName: '',
        tenantDateOfBirth: '',
        documentType: 'uk_passport',
        documentNumber: '',
        expiryDate: '',
        notes: '',
      });
    } catch (error: any) {
      logger.error('Error saving right to rent check', error);
      Alert.alert('Error', error.message || 'Failed to save right to rent check');
    }
  };

  const documentTypes = [
    { value: 'uk_passport', label: 'UK Passport' },
    { value: 'eu_passport', label: 'EU Passport' },
    { value: 'biometric_residence_permit', label: 'Biometric Residence Permit' },
    { value: 'birth_certificate', label: 'Birth Certificate' },
    { value: 'driving_licence', label: 'Driving Licence' },
    { value: 'other', label: 'Other' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return { bg: '#d1fae5', text: '#059669' };
      case 'failed':
        return { bg: '#fee2e2', text: '#dc2626' };
      case 'expired':
        return { bg: '#fef3c7', text: '#d97706' };
      default:
        return { bg: '#e5e7eb', text: '#6b7280' };
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Right to Rent Checks</Text>
        <TouchableOpacity onPress={() => setShowForm(true)} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {showForm ? (
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>New Right to Rent Check</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Tenant Name</Text>
              <TextInput
                style={styles.input}
                value={formData.tenantName}
                onChangeText={(text) => setFormData({ ...formData, tenantName: text })}
                placeholder="Enter tenant name"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput
                style={styles.input}
                value={formData.tenantDateOfBirth}
                onChangeText={(text) => setFormData({ ...formData, tenantDateOfBirth: text })}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Document Type</Text>
              {documentTypes.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  style={[
                    styles.option,
                    formData.documentType === type.value && styles.optionSelected,
                  ]}
                  onPress={() => setFormData({ ...formData, documentType: type.value })}
                >
                  <Text
                    style={[
                      styles.optionText,
                      formData.documentType === type.value && styles.optionTextSelected,
                    ]}
                  >
                    {type.label}
                  </Text>
                  {formData.documentType === type.value && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Document Number</Text>
              <TextInput
                style={styles.input}
                value={formData.documentNumber}
                onChangeText={(text) => setFormData({ ...formData, documentNumber: text })}
                placeholder="Enter document number"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Expiry Date (if applicable)</Text>
              <TextInput
                style={styles.input}
                value={formData.expiryDate}
                onChangeText={(text) => setFormData({ ...formData, expiryDate: text })}
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
              <TouchableOpacity
                onPress={() => setShowForm(false)}
                style={[styles.button, styles.cancelButton]}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={[styles.button, styles.saveButton]}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.content}>
          {checks.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📄</Text>
              <Text style={styles.emptyTitle}>No Right to Rent Checks</Text>
              <Text style={styles.emptyText}>
                Right to rent checks are mandatory for all tenants aged 18+ in England.
              </Text>
            </View>
          ) : (
            checks.map((check) => {
              const statusColors = getStatusColor(check.status);
              return (
                <View key={check._id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{check.tenantName}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
                      <Text style={[styles.statusText, { color: statusColors.text }]}>
                        {check.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Document Type</Text>
                    <Text style={styles.value}>
                      {documentTypes.find((t) => t.value === check.documentType)?.label ||
                        check.documentType}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Document Number</Text>
                    <Text style={styles.value}>{check.documentNumber}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Date of Birth</Text>
                    <Text style={styles.value}>
                      {new Date(check.tenantDateOfBirth).toLocaleDateString()}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Check Date</Text>
                    <Text style={styles.value}>
                      {new Date(check.checkDate).toLocaleDateString()}
                    </Text>
                  </View>

                  {check.expiryDate && (
                    <View style={styles.detailRow}>
                      <Text style={styles.label}>Expiry Date</Text>
                      <Text style={styles.value}>
                        {new Date(check.expiryDate).toLocaleDateString()}
                      </Text>
                    </View>
                  )}

                  {check.notes && (
                    <View style={styles.notesContainer}>
                      <Text style={styles.label}>Notes</Text>
                      <Text style={styles.notes}>{check.notes}</Text>
                    </View>
                  )}
                </View>
              );
            })
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
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
    marginBottom: 12,
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
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  notes: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
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
  option: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#f0f4ff',
  },
  optionText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  optionTextSelected: {
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

export default RightToRentScreen;
