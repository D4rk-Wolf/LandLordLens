import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';

interface ComplianceRecord {
  complianceType: string;
  certificateNumber: string;
  issueDate: string;
  expiryDate: string;
  issuer: string;
  notes: string;
}

interface NewPropertyScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

const NewPropertyScreen: React.FC<NewPropertyScreenProps> = ({ onNavigate, onBack }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: {
      line1: '',
      line2: '',
      city: '',
      postcode: '',
      county: '',
    },
    propertyType: 'house',
    bedrooms: '',
    bathrooms: '1',
    rentAmount: '',
    purchasePrice: '',
    status: 'vacant',
    availabilityStatus: 'ready_for_rent',
  });
  const [complianceRecords, setComplianceRecords] = useState<ComplianceRecord[]>([]);
  const [showComplianceForm, setShowComplianceForm] = useState(false);
  const [currentCompliance, setCurrentCompliance] = useState<ComplianceRecord>({
    complianceType: 'gas_safety',
    certificateNumber: '',
    issueDate: '',
    expiryDate: '',
    issuer: '',
    notes: '',
  });

  const complianceTypes = [
    { value: 'gas_safety', label: 'Gas Safety Certificate' },
    { value: 'epc', label: 'EPC Certificate' },
    { value: 'electrical', label: 'Electrical Safety Certificate' },
    { value: 'fire_safety', label: 'Fire Safety Assessment' },
    { value: 'hmo_license', label: 'HMO License' },
    { value: 'other', label: 'Other' },
  ];

  const availabilityStatuses = [
    { value: 'free', label: 'Free', icon: '🆓', description: 'Property is free' },
    { value: 'for_sale', label: 'For Sale', icon: '💰', description: 'Property is for sale' },
    { value: 'ready_for_rent', label: 'Ready for Rent', icon: '🏠', description: 'Available for rent' },
    { value: 'rented', label: 'Rented', icon: '✅', description: 'Currently rented' },
    { value: 'not_available', label: 'Not Available', icon: '🚫', description: 'Not available' },
  ];

  const addComplianceRecord = () => {
    if (!currentCompliance.complianceType || !currentCompliance.issueDate || !currentCompliance.expiryDate) {
      Alert.alert('Error', 'Please fill in compliance type, issue date, and expiry date');
      return;
    }
    setComplianceRecords([...complianceRecords, { ...currentCompliance }]);
    setCurrentCompliance({
      complianceType: 'gas_safety',
      certificateNumber: '',
      issueDate: '',
      expiryDate: '',
      issuer: '',
      notes: '',
    });
    setShowComplianceForm(false);
  };

  const removeComplianceRecord = (index: number) => {
    const updated = complianceRecords.filter((_, i) => i !== index);
    setComplianceRecords(updated);
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.address.line1?.trim()) {
      newErrors.addressLine1 = 'Address line 1 is required';
    }
    if (!formData.address.city?.trim()) {
      newErrors.addressCity = 'City is required';
    }
    if (!formData.address.postcode?.trim()) {
      newErrors.addressPostcode = 'Postcode is required';
    } else {
      // Basic UK postcode validation
      const postcodeRegex = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i;
      if (!postcodeRegex.test(formData.address.postcode.trim())) {
        newErrors.addressPostcode = 'Please enter a valid UK postcode';
      }
    }
    if (!formData.bedrooms || parseInt(formData.bedrooms) < 0) {
      newErrors.bedrooms = 'Please specify a valid number of bedrooms';
    }
    if (formData.rentAmount && parseFloat(formData.rentAmount) < 0) {
      newErrors.rentAmount = 'Rent amount must be positive';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fix the errors in the form');
      return;
    }

    setLoading(true);
    try {
      await apiClient.post(
        '/properties',
        {
          ...formData,
          bedrooms: parseInt(formData.bedrooms) || 0,
          bathrooms: parseInt(formData.bathrooms) || 1,
          rentAmount: formData.rentAmount ? parseFloat(formData.rentAmount) : undefined,
          purchasePrice: formData.purchasePrice ? parseFloat(formData.purchasePrice) : undefined,
          complianceRecords: complianceRecords.length > 0 ? complianceRecords.map(record => {
            // Ensure dates are valid before converting
            let issueDate, expiryDate;
            try {
              issueDate = record.issueDate ? new Date(record.issueDate).toISOString() : undefined;
              expiryDate = record.expiryDate ? new Date(record.expiryDate).toISOString() : undefined;
            } catch (error) {
              logger.error('Date conversion error', error);
              issueDate = record.issueDate;
              expiryDate = record.expiryDate;
            }
            return {
              complianceType: record.complianceType,
              certificateNumber: record.certificateNumber || undefined,
              issueDate: issueDate,
              expiryDate: expiryDate,
              issuer: record.issuer || undefined,
              notes: record.notes || undefined,
            };
          }) : undefined,
        },
        token
      );

      Alert.alert('Success', 'Property created successfully', [
        { text: 'OK', onPress: () => onNavigate('properties') },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>New Property</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Address Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address Line 1 *</Text>
            <TextInput
              style={[styles.input, errors.addressLine1 && styles.inputError]}
              value={formData.address.line1}
              onChangeText={(text) => {
                setFormData({ ...formData, address: { ...formData.address, line1: text } });
                if (errors.addressLine1) {
                  setErrors({ ...errors, addressLine1: '' });
                }
              }}
              placeholder="Street address"
              placeholderTextColor="#9ca3af"
            />
            {errors.addressLine1 && (
              <Text style={styles.errorText}>{errors.addressLine1}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address Line 2</Text>
            <TextInput
              style={styles.input}
              value={formData.address.line2}
              onChangeText={(text) =>
                setFormData({ ...formData, address: { ...formData.address, line2: text } })
              }
              placeholder="Apartment, suite, etc."
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputRow}>
            <View style={[styles.inputContainer, styles.inputHalf]}>
              <Text style={styles.label}>City *</Text>
              <TextInput
                style={[styles.input, errors.addressCity && styles.inputError]}
                value={formData.address.city}
                onChangeText={(text) => {
                  setFormData({ ...formData, address: { ...formData.address, city: text } });
                  if (errors.addressCity) {
                    setErrors({ ...errors, addressCity: '' });
                  }
                }}
                placeholder="City"
                placeholderTextColor="#9ca3af"
              />
              {errors.addressCity && (
                <Text style={styles.errorText}>{errors.addressCity}</Text>
              )}
            </View>

            <View style={[styles.inputContainer, styles.inputHalf]}>
              <Text style={styles.label}>Postcode *</Text>
              <TextInput
                style={[styles.input, errors.addressPostcode && styles.inputError]}
                value={formData.address.postcode}
                onChangeText={(text) => {
                  setFormData({ ...formData, address: { ...formData.address, postcode: text } });
                  if (errors.addressPostcode) {
                    setErrors({ ...errors, addressPostcode: '' });
                  }
                }}
                placeholder="Postcode"
                placeholderTextColor="#9ca3af"
                autoCapitalize="characters"
              />
              {errors.addressPostcode && (
                <Text style={styles.errorText}>{errors.addressPostcode}</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏠 Property Details</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Property Type</Text>
            <View style={styles.row}>
              {['house', 'flat', 'apartment', 'bungalow'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    formData.propertyType === type && styles.typeButtonActive,
                  ]}
                  onPress={() => setFormData({ ...formData, propertyType: type })}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      formData.propertyType === type && styles.typeButtonTextActive,
                    ]}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={[styles.inputContainer, styles.inputHalf]}>
              <Text style={styles.label}>Bedrooms *</Text>
              <TextInput
                style={[styles.input, errors.bedrooms && styles.inputError]}
                value={formData.bedrooms}
                onChangeText={(text) => {
                  setFormData({ ...formData, bedrooms: text });
                  if (errors.bedrooms) {
                    setErrors({ ...errors, bedrooms: '' });
                  }
                }}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#9ca3af"
              />
              {errors.bedrooms && (
                <Text style={styles.errorText}>{errors.bedrooms}</Text>
              )}
            </View>

            <View style={[styles.inputContainer, styles.inputHalf]}>
              <Text style={styles.label}>Bathrooms</Text>
              <TextInput
                style={styles.input}
                value={formData.bathrooms}
                onChangeText={(text) => setFormData({ ...formData, bathrooms: text })}
                keyboardType="numeric"
                placeholder="1"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Monthly Rent (£)</Text>
            <TextInput
              style={styles.input}
              value={formData.rentAmount}
              onChangeText={(text) => setFormData({ ...formData, rentAmount: text })}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Purchase Price (£)</Text>
            <TextInput
              style={styles.input}
              value={formData.purchasePrice}
              onChangeText={(text) => setFormData({ ...formData, purchasePrice: text })}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Availability Status</Text>
          <Text style={styles.sectionDescription}>
            Mark the current availability status of this property
          </Text>
          
          <View style={styles.availabilityGrid}>
            {availabilityStatuses.map((status) => (
              <TouchableOpacity
                key={status.value}
                style={[
                  styles.availabilityCard,
                  formData.availabilityStatus === status.value && styles.availabilityCardActive,
                ]}
                onPress={() => setFormData({ ...formData, availabilityStatus: status.value })}
              >
                <Text style={styles.availabilityIcon}>{status.icon}</Text>
                <Text
                  style={[
                    styles.availabilityLabel,
                    formData.availabilityStatus === status.value && styles.availabilityLabelActive,
                  ]}
                >
                  {status.label}
                </Text>
                <Text style={styles.availabilityDescription}>{status.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>📋 Compliance Records</Text>
              <Text style={styles.sectionDescription}>
                Add compliance certificates and documents for this property
              </Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowComplianceForm(!showComplianceForm)}
            >
              <Text style={styles.addButtonText}>
                {showComplianceForm ? '−' : '+'} {showComplianceForm ? 'Cancel' : 'Add Compliance'}
              </Text>
            </TouchableOpacity>
          </View>

          {showComplianceForm && (
            <View style={styles.complianceForm}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Compliance Type *</Text>
                <View style={styles.complianceTypeGrid}>
                  {complianceTypes.map((type) => (
                    <TouchableOpacity
                      key={type.value}
                      style={[
                        styles.complianceTypeButton,
                        currentCompliance.complianceType === type.value &&
                          styles.complianceTypeButtonActive,
                      ]}
                      onPress={() =>
                        setCurrentCompliance({ ...currentCompliance, complianceType: type.value })
                      }
                    >
                      <Text
                        style={[
                          styles.complianceTypeText,
                          currentCompliance.complianceType === type.value &&
                            styles.complianceTypeTextActive,
                        ]}
                      >
                        {type.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Certificate Number</Text>
                <TextInput
                  style={styles.input}
                  value={currentCompliance.certificateNumber}
                  onChangeText={(text) =>
                    setCurrentCompliance({ ...currentCompliance, certificateNumber: text })
                  }
                  placeholder="Enter certificate number"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputContainer, styles.inputHalf]}>
                  <Text style={styles.label}>Issue Date *</Text>
                  <TextInput
                    style={styles.input}
                    value={currentCompliance.issueDate}
                    onChangeText={(text) =>
                      setCurrentCompliance({ ...currentCompliance, issueDate: text })
                    }
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor="#9ca3af"
                  />
                </View>

                <View style={[styles.inputContainer, styles.inputHalf]}>
                  <Text style={styles.label}>Expiry Date *</Text>
                  <TextInput
                    style={styles.input}
                    value={currentCompliance.expiryDate}
                    onChangeText={(text) =>
                      setCurrentCompliance({ ...currentCompliance, expiryDate: text })
                    }
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Issuer</Text>
                <TextInput
                  style={styles.input}
                  value={currentCompliance.issuer}
                  onChangeText={(text) =>
                    setCurrentCompliance({ ...currentCompliance, issuer: text })
                  }
                  placeholder="Certificate issuer name"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Notes</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={currentCompliance.notes}
                  onChangeText={(text) =>
                    setCurrentCompliance({ ...currentCompliance, notes: text })
                  }
                  placeholder="Additional notes"
                  placeholderTextColor="#9ca3af"
                  multiline
                  numberOfLines={3}
                />
              </View>

              <TouchableOpacity
                style={styles.addComplianceButton}
                onPress={addComplianceRecord}
              >
                <Text style={styles.addComplianceButtonText}>Add Compliance Record</Text>
              </TouchableOpacity>
            </View>
          )}

          {complianceRecords.length > 0 && (
            <View style={styles.complianceList}>
              <Text style={styles.complianceListTitle}>
                Added Compliance Records ({complianceRecords.length})
              </Text>
              {complianceRecords.map((record, index) => {
                const typeLabel = complianceTypes.find((t) => t.value === record.complianceType)?.label || record.complianceType;
                return (
                  <View key={index} style={styles.complianceListItem}>
                    <View style={styles.complianceListItemContent}>
                      <Text style={styles.complianceListItemType}>{typeLabel}</Text>
                      {record.certificateNumber && (
                        <Text style={styles.complianceListItemNumber}>
                          Cert: {record.certificateNumber}
                        </Text>
                      )}
                      {record.expiryDate && (
                        <Text style={styles.complianceListItemDate}>
                          Expires: {record.expiryDate}
                        </Text>
                      )}
                    </View>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeComplianceRecord(index)}
                    >
                      <Text style={styles.removeButtonText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Creating...' : 'Create Property'}
          </Text>
        </TouchableOpacity>
      </View>
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
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.5,
  },
  form: {
    padding: 20,
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  inputHalf: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#111827',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    minWidth: 100,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  typeButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
  typeButtonTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  availabilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  availabilityCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    marginBottom: 12,
  },
  availabilityCardActive: {
    backgroundColor: '#f0f4ff',
    borderColor: '#6366f1',
  },
  availabilityIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  availabilityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  availabilityLabelActive: {
    color: '#6366f1',
  },
  availabilityDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  complianceForm: {
    backgroundColor: '#f9fafb',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  complianceTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  complianceTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  complianceTypeButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  complianceTypeText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  complianceTypeTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  addComplianceButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addComplianceButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  complianceList: {
    marginTop: 20,
  },
  complianceListTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  complianceListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  complianceListItemContent: {
    flex: 1,
  },
  complianceListItemType: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  complianceListItemNumber: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 2,
  },
  complianceListItemDate: {
    fontSize: 13,
    color: '#6b7280',
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  removeButtonText: {
    color: '#dc2626',
    fontSize: 18,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#6366f1',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
    boxShadow: '0px 4px 8px 0px rgba(99, 102, 241, 0.3)',
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#d1d5db',
    boxShadow: 'none',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  inputError: {
    borderColor: '#dc2626',
  },
  errorText: {
    fontSize: 12,
    color: '#dc2626',
    marginTop: 4,
    fontWeight: '500',
  },
});

export default NewPropertyScreen;
