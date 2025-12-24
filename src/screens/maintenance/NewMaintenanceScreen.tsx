import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';
import PageHeader from '../../components/ui/PageHeader';

interface Property {
  _id: string;
  address: {
    line1: string;
    city: string;
    postcode: string;
  };
}

interface NewMaintenanceScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
  propertyId?: string;
}

const NewMaintenanceScreen: React.FC<NewMaintenanceScreenProps> = ({ onNavigate, onBack, propertyId }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [formData, setFormData] = useState({
    propertyId: propertyId || '',
    title: '',
    description: '',
    priority: 'medium',
    reportedBy: '',
  });

  const fetchProperties = useCallback(async () => {
    if (!token) return;

    try {
      const data = await apiClient.get<{ properties: Property[] }>(
        '/properties',
        token || undefined,
        { cache: true, cacheTTL: 2 * 60 * 1000 }
      );
      setProperties(data.properties || []);
      if (propertyId && !formData.propertyId) {
        setFormData(prev => ({ ...prev, propertyId }));
      }
    } catch (error) {
      logger.error('Error fetching properties', error);
    } finally {
      setLoadingProperties(false);
    }
  }, [token, propertyId]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      Alert.alert('Error', 'Please fill in title and description');
      return;
    }

    if (!formData.propertyId) {
      Alert.alert('Error', 'Please select a property');
      return;
    }

    setLoading(true);
    try {
      await apiClient.post(
        `/properties/${formData.propertyId}/maintenance`,
        {
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
          reportedBy: formData.reportedBy || undefined,
        },
        token || undefined
      );

      Alert.alert('Success', 'Maintenance ticket created successfully', [
        { text: 'OK', onPress: () => onNavigate('maintenance') },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create maintenance ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <PageHeader
        title="New Maintenance Ticket"
        leftAction={
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        }
      />

      <View style={styles.form}>
        <Text style={styles.label}>Property *</Text>
        {loadingProperties ? (
          <Text style={styles.loadingText}>Loading properties...</Text>
        ) : (
          <View style={styles.propertySelector}>
            {properties.map((property) => (
              <TouchableOpacity
                key={property._id}
                style={[
                  styles.propertyOption,
                  formData.propertyId === property._id && styles.propertyOptionActive,
                ]}
                onPress={() => setFormData({ ...formData, propertyId: property._id })}
              >
                <Text
                  style={[
                    styles.propertyOptionText,
                    formData.propertyId === property._id && styles.propertyOptionTextActive,
                  ]}
                >
                  {property.address.line1}, {property.address.city} {property.address.postcode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={styles.input}
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
          placeholder="Brief description of the issue"
        />

        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          placeholder="Detailed description of the maintenance issue"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Priority</Text>
        <View style={styles.row}>
          {['low', 'medium', 'high', 'urgent'].map((priority) => (
            <TouchableOpacity
              key={priority}
              style={[
                styles.priorityButton,
                formData.priority === priority && styles.priorityButtonActive,
              ]}
              onPress={() => setFormData({ ...formData, priority })}
            >
              <Text
                style={[
                  styles.priorityButtonText,
                  formData.priority === priority && styles.priorityButtonTextActive,
                ]}
              >
                {priority}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Reported By</Text>
        <TextInput
          style={styles.input}
          value={formData.reportedBy}
          onChangeText={(text) => setFormData({ ...formData, reportedBy: text })}
          placeholder="Name of person reporting"
        />

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Creating...' : 'Create Ticket'}
          </Text>
        </TouchableOpacity>
      </View>
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
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'var(--bg-surface)',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  priorityButton: {
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'var(--bg-surface)',
  },
  priorityButtonActive: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  priorityButtonText: {
    color: '#2c3e50',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  priorityButtonTextActive: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  submitButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  propertySelector: {
    marginBottom: 15,
  },
  propertyOption: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: 'var(--bg-surface)',
  },
  propertyOptionActive: {
    borderColor: '#3498db',
    backgroundColor: '#ebf5fb',
  },
  propertyOptionText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  propertyOptionTextActive: {
    color: '#3498db',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'var(--bg-surface)',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 15,
  },
});

export default NewMaintenanceScreen;
