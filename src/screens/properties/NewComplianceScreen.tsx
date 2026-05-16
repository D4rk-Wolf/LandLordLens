import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';
import PageHeader from '../../components/ui/PageHeader';

const NewComplianceScreen: React.FC = () => {
  const { id: propertyId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleSubmit = async () => {
    if (!formData.issueDate || !formData.expiryDate) {
      Alert.alert('Error', 'Please fill in issue date and expiry date');
      return;
    }

    setLoading(true);
    try {
      await apiClient.post(
        `/properties/${propertyId}/compliance`,
        {
          complianceType: formData.complianceType,
          certificateNumber: formData.certificateNumber || undefined,
          issueDate: formData.issueDate,
          expiryDate: formData.expiryDate,
          issuer: formData.issuer || undefined,
          notes: formData.notes || undefined,
        },
        undefined
      );

      Alert.alert('Success', 'Compliance record created successfully', [
        { text: 'OK', onPress: () => navigate(-1) },
      ]);
    } catch (error: any) {
      logger.error('Error creating compliance record', error);
      Alert.alert('Error', error.message || 'Failed to create compliance record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title="Add Compliance Record"
        leftAction={
          <TouchableOpacity onPress={() => navigate(-1)} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView style={styles.scrollView}>

        <View style={styles.form}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Compliance Information</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Compliance Type *</Text>
              <View style={styles.typeSelector}>
                {complianceTypes.map((type) => (
                  <TouchableOpacity
                    key={type.value}
                    style={[
                      styles.typeButton,
                      formData.complianceType === type.value && styles.typeButtonActive,
                    ]}
                    onPress={() => setFormData({ ...formData, complianceType: type.value })}
                  >
                    <Text
                      style={[
                        styles.typeButtonText,
                        formData.complianceType === type.value && styles.typeButtonTextActive,
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
                value={formData.certificateNumber}
                onChangeText={(text) => setFormData({ ...formData, certificateNumber: text })}
                placeholder="Certificate or license number"
              />
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputContainer, styles.inputHalf]}>
                <Text style={styles.label}>Issue Date *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.issueDate}
                  onChangeText={(text) => setFormData({ ...formData, issueDate: text })}
                  placeholder="YYYY-MM-DD"
                />
              </View>

              <View style={[styles.inputContainer, styles.inputHalf]}>
                <Text style={styles.label}>Expiry Date *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.expiryDate}
                  onChangeText={(text) => setFormData({ ...formData, expiryDate: text })}
                  placeholder="YYYY-MM-DD"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Issuer</Text>
              <TextInput
                style={styles.input}
                value={formData.issuer}
                onChangeText={(text) => setFormData({ ...formData, issuer: text })}
                placeholder="Name of issuing authority or company"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.notes}
                onChangeText={(text) => setFormData({ ...formData, notes: text })}
                placeholder="Additional notes about this compliance record"
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Creating...' : 'Create Compliance Record'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },
  form: {
    padding: 20,
  },
  section: {
    backgroundColor: 'var(--bg-surface)',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  inputHalf: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: 'var(--bg-surface)',
    color: '#2c3e50',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeButton: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: 'var(--bg-surface)',
    minWidth: 150,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  typeButtonText: {
    color: '#2c3e50',
    fontSize: 14,
    fontWeight: '500',
  },
  typeButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    boxShadow: '0px 4px 8px 0px rgba(52, 152, 219, 0.3)',
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#bdc3c7',
    boxShadow: 'none',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default NewComplianceScreen;
