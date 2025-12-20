import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';

interface TenantBackgroundCheckScreenProps {
  tenancyId: string;
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

const TenantBackgroundCheckScreen: React.FC<TenantBackgroundCheckScreenProps> = ({
  tenancyId,
  onNavigate,
  onBack,
}) => {
  const { token } = useAuth();
  const [backgroundCheck, setBackgroundCheck] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    creditCheck: { performed: false, provider: '', score: '', status: 'pending' },
    employmentCheck: { performed: false, employerName: '', employerContact: '', position: '', salary: '', status: 'pending' },
    previousLandlordReference: { performed: false, landlordName: '', landlordContact: '', propertyAddress: '', rentPaidOnTime: true, propertyMaintained: true, wouldRentAgain: true, status: 'pending' },
    criminalRecordCheck: { performed: false, status: 'pending' },
    overallStatus: 'pending',
    notes: '',
  });

  useEffect(() => {
    fetchBackgroundCheck();
  }, [tenancyId]);

  const fetchBackgroundCheck = useCallback(async () => {
    if (!token) return;

    try {
      const data = await apiClient.get<any>(
        `/tenancies/${tenancyId}`,
        token,
        { cache: true, cacheTTL: 2 * 60 * 1000 }
      );
      if (data.backgroundCheck) {
        setBackgroundCheck(data.backgroundCheck);
        setFormData({
          creditCheck: data.backgroundCheck.creditCheck || formData.creditCheck,
          employmentCheck: data.backgroundCheck.employmentCheck || formData.employmentCheck,
          previousLandlordReference: data.backgroundCheck.previousLandlordReference || formData.previousLandlordReference,
          criminalRecordCheck: data.backgroundCheck.criminalRecordCheck || formData.criminalRecordCheck,
          overallStatus: data.backgroundCheck.overallStatus || 'pending',
          notes: data.backgroundCheck.notes || '',
        });
      }
    } catch (error) {
      logger.error('Error fetching background check', error);
    } finally {
      setLoading(false);
    }
  }, [tenancyId, token]);

  useEffect(() => {
    fetchBackgroundCheck();
  }, [fetchBackgroundCheck]);

  const handleSave = async () => {
    try {
      await apiClient.post(
        `/tenancies/${tenancyId}/background-check`,
        formData,
        token
      );

      Alert.alert('Success', 'Background check saved');
      await fetchBackgroundCheck();
      setEditing(false);
    } catch (error: any) {
      logger.error('Error saving background check', error);
      Alert.alert('Error', error.message || 'Failed to save background check');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'passed':
      case 'positive':
      case 'verified':
        return { bg: '#d1fae5', text: '#059669' };
      case 'rejected':
      case 'failed':
      case 'negative':
        return { bg: '#fee2e2', text: '#dc2626' };
      case 'conditional':
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
        <Text style={styles.title}>Background Check</Text>
        {backgroundCheck && !editing && (
          <TouchableOpacity onPress={() => setEditing(true)} style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      {backgroundCheck && !editing ? (
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Overall Status</Text>
              {(() => {
                const colors = getStatusColor(backgroundCheck.overallStatus);
                return (
                  <View style={[styles.statusBadge, { backgroundColor: colors.bg }]}>
                    <Text style={[styles.statusText, { color: colors.text }]}>
                      {backgroundCheck.overallStatus.toUpperCase()}
                    </Text>
                  </View>
                );
              })()}
            </View>

            {/* Credit Check */}
            {backgroundCheck.creditCheck?.performed && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Credit Check</Text>
                {backgroundCheck.creditCheck.provider && (
                  <Text style={styles.detailText}>
                    Provider: {backgroundCheck.creditCheck.provider}
                  </Text>
                )}
                {backgroundCheck.creditCheck.score && (
                  <Text style={styles.detailText}>
                    Score: {backgroundCheck.creditCheck.score}
                  </Text>
                )}
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(backgroundCheck.creditCheck.status).bg }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(backgroundCheck.creditCheck.status).text }]}>
                    {backgroundCheck.creditCheck.status}
                  </Text>
                </View>
              </View>
            )}

            {/* Employment Check */}
            {backgroundCheck.employmentCheck?.performed && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Employment Check</Text>
                {backgroundCheck.employmentCheck.employerName && (
                  <Text style={styles.detailText}>
                    Employer: {backgroundCheck.employmentCheck.employerName}
                  </Text>
                )}
                {backgroundCheck.employmentCheck.position && (
                  <Text style={styles.detailText}>
                    Position: {backgroundCheck.employmentCheck.position}
                  </Text>
                )}
                {backgroundCheck.employmentCheck.salary && (
                  <Text style={styles.detailText}>
                    Salary: £{backgroundCheck.employmentCheck.salary}
                  </Text>
                )}
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(backgroundCheck.employmentCheck.status).bg }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(backgroundCheck.employmentCheck.status).text }]}>
                    {backgroundCheck.employmentCheck.status}
                  </Text>
                </View>
              </View>
            )}

            {/* Previous Landlord Reference */}
            {backgroundCheck.previousLandlordReference?.performed && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Previous Landlord Reference</Text>
                {backgroundCheck.previousLandlordReference.landlordName && (
                  <Text style={styles.detailText}>
                    Landlord: {backgroundCheck.previousLandlordReference.landlordName}
                  </Text>
                )}
                <View style={styles.checkRow}>
                  <Text style={styles.checkLabel}>
                    {backgroundCheck.previousLandlordReference.rentPaidOnTime ? '✓' : '✗'} Rent Paid On Time
                  </Text>
                </View>
                <View style={styles.checkRow}>
                  <Text style={styles.checkLabel}>
                    {backgroundCheck.previousLandlordReference.propertyMaintained ? '✓' : '✗'} Property Maintained
                  </Text>
                </View>
                <View style={styles.checkRow}>
                  <Text style={styles.checkLabel}>
                    {backgroundCheck.previousLandlordReference.wouldRentAgain ? '✓' : '✗'} Would Rent Again
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(backgroundCheck.previousLandlordReference.status).bg }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(backgroundCheck.previousLandlordReference.status).text }]}>
                    {backgroundCheck.previousLandlordReference.status}
                  </Text>
                </View>
              </View>
            )}

            {/* Criminal Record Check */}
            {backgroundCheck.criminalRecordCheck?.performed && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Criminal Record Check</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(backgroundCheck.criminalRecordCheck.status).bg }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(backgroundCheck.criminalRecordCheck.status).text }]}>
                    {backgroundCheck.criminalRecordCheck.status === 'clear' ? 'CLEAR' : 'ISSUES FOUND'}
                  </Text>
                </View>
              </View>
            )}

            {backgroundCheck.notes && (
              <View style={styles.notesContainer}>
                <Text style={styles.label}>Notes</Text>
                <Text style={styles.notes}>{backgroundCheck.notes}</Text>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tenant Background Check</Text>

            {/* Credit Check Section */}
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Credit Check</Text>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() =>
                  setFormData({
                    ...formData,
                    creditCheck: {
                      ...formData.creditCheck,
                      performed: !formData.creditCheck.performed,
                    },
                  })
                }
              >
                <View
                  style={[
                    styles.checkboxBox,
                    formData.creditCheck.performed && styles.checkboxBoxChecked,
                  ]}
                >
                  {formData.creditCheck.performed && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>Performed</Text>
              </TouchableOpacity>

              {formData.creditCheck.performed && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Provider"
                    value={formData.creditCheck.provider}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        creditCheck: { ...formData.creditCheck, provider: text },
                      })
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Credit Score"
                    value={formData.creditCheck.score}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        creditCheck: { ...formData.creditCheck, score: text },
                      })
                    }
                    keyboardType="numeric"
                  />
                </>
              )}
            </View>

            {/* Employment Check Section */}
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Employment Check</Text>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() =>
                  setFormData({
                    ...formData,
                    employmentCheck: {
                      ...formData.employmentCheck,
                      performed: !formData.employmentCheck.performed,
                    },
                  })
                }
              >
                <View
                  style={[
                    styles.checkboxBox,
                    formData.employmentCheck.performed && styles.checkboxBoxChecked,
                  ]}
                >
                  {formData.employmentCheck.performed && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>Performed</Text>
              </TouchableOpacity>

              {formData.employmentCheck.performed && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Employer Name"
                    value={formData.employmentCheck.employerName}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        employmentCheck: { ...formData.employmentCheck, employerName: text },
                      })
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Position"
                    value={formData.employmentCheck.position}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        employmentCheck: { ...formData.employmentCheck, position: text },
                      })
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Salary"
                    value={formData.employmentCheck.salary}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        employmentCheck: { ...formData.employmentCheck, salary: text },
                      })
                    }
                    keyboardType="numeric"
                  />
                </>
              )}
            </View>

            {/* Overall Status */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Overall Status</Text>
              {['approved', 'rejected', 'conditional', 'pending'].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.option,
                    formData.overallStatus === status && styles.optionSelected,
                  ]}
                  onPress={() => setFormData({ ...formData, overallStatus: status })}
                >
                  <Text
                    style={[
                      styles.optionText,
                      formData.overallStatus === status && styles.optionTextSelected,
                    ]}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Text>
                  {formData.overallStatus === status && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
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
                    fetchBackgroundCheck();
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
  editButton: {
    padding: 8,
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
  section: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  checkRow: {
    marginBottom: 8,
  },
  checkLabel: {
    fontSize: 14,
    color: '#374151',
  },
  notesContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  notes: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  formSection: {
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
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
    marginTop: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxBoxChecked: {
    borderColor: '#6366f1',
    backgroundColor: '#6366f1',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
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
    color: '#ffffff',
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

export default TenantBackgroundCheckScreen;
