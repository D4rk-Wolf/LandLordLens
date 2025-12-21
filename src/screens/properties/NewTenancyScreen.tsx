import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { apiClient } from '../../utils/api-client';
import { logger } from '../../utils/logger';
import PageHeader from '../../components/ui/PageHeader';

interface NewTenancyScreenProps {
  propertyId: string;
  onNavigate: (screen: string) => void;
  onBack: () => void;
  onSignOut: () => void;
}

const NewTenancyScreen: React.FC<NewTenancyScreenProps> = ({ propertyId, onNavigate, onBack, onSignOut }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tenantName: '',
    tenantEmail: '',
    tenantPhone: '',
    startDate: '',
    endDate: '',
    monthlyRent: '',
    deposit: '',
    notes: '',
  });

  const handleSubmit = async () => {
    if (!formData.tenantName || !formData.tenantEmail || !formData.startDate || !formData.monthlyRent) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await apiClient.post(
        `/properties/${propertyId}/tenancies`,
        {
          tenantName: formData.tenantName,
          tenantEmail: formData.tenantEmail,
          tenantPhone: formData.tenantPhone || undefined,
          startDate: formData.startDate,
          endDate: formData.endDate || undefined,
          monthlyRent: parseFloat(formData.monthlyRent),
          deposit: formData.deposit ? parseFloat(formData.deposit) : undefined,
          notes: formData.notes || undefined,
        },
        token || undefined
      );

      Alert.alert('Success', 'Tenancy created successfully', [
        { text: 'OK', onPress: onBack },
      ]);
    } catch (error: any) {
      logger.error('Error creating tenancy', error);
      Alert.alert('Error', error.message || 'Failed to create tenancy');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title="New Tenancy"
        onSignOut={onSignOut}
        leftAction={
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView style={styles.scrollView}>

        <View style={styles.form}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>👤 Tenant Information</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tenant Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.tenantName}
                onChangeText={(text) => setFormData({ ...formData, tenantName: text })}
                placeholder="Full name"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={styles.input}
                value={formData.tenantEmail}
                onChangeText={(text) => setFormData({ ...formData, tenantEmail: text })}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="email@example.com"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                value={formData.tenantPhone}
                onChangeText={(text) => setFormData({ ...formData, tenantPhone: text })}
                keyboardType="phone-pad"
                placeholder="+44 7xxx xxxxxx"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📅 Tenancy Details</Text>

            <View style={styles.inputRow}>
              <View style={[styles.inputContainer, styles.inputHalf]}>
                <Text style={styles.label}>Start Date *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.startDate}
                  onChangeText={(text) => setFormData({ ...formData, startDate: text })}
                  placeholder="YYYY-MM-DD"
                />
              </View>

              <View style={[styles.inputContainer, styles.inputHalf]}>
                <Text style={styles.label}>End Date</Text>
                <TextInput
                  style={styles.input}
                  value={formData.endDate}
                  onChangeText={(text) => setFormData({ ...formData, endDate: text })}
                  placeholder="YYYY-MM-DD"
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputContainer, styles.inputHalf]}>
                <Text style={styles.label}>Monthly Rent (£) *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.monthlyRent}
                  onChangeText={(text) => setFormData({ ...formData, monthlyRent: text })}
                  keyboardType="numeric"
                  placeholder="0.00"
                />
              </View>

              <View style={[styles.inputContainer, styles.inputHalf]}>
                <Text style={styles.label}>Deposit (£)</Text>
                <TextInput
                  style={styles.input}
                  value={formData.deposit}
                  onChangeText={(text) => setFormData({ ...formData, deposit: text })}
                  keyboardType="numeric"
                  placeholder="0.00"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.notes}
                onChangeText={(text) => setFormData({ ...formData, notes: text })}
                placeholder="Additional notes about the tenancy"
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
              {loading ? 'Creating...' : 'Create Tenancy'}
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
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
    color: '#2c3e50',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
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

export default NewTenancyScreen;
