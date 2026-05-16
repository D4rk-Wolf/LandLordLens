import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';
import PageHeader from '../../components/ui/PageHeader';

interface InspectionsScreenProps {
  propertyId?: string;
}

const InspectionsScreen: React.FC<InspectionsScreenProps> = ({ propertyId: propPropertyId }) => {
  const { propertyId: paramPropertyId } = useParams<{ propertyId: string }>();
  const propertyId = propPropertyId || paramPropertyId;
  const { token } = useAuth();
  const [inspections, setInspections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    propertyId: propertyId || '',
    inspectionType: 'routine',
    scheduledDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const fetchInspections = useCallback(async () => {
    try {
      const endpoint = propertyId ? `/inspections?propertyId=${propertyId}` : '/inspections';
      const data = await apiClient.get<{ inspections: any[] }>(
        endpoint,
        token || undefined,
        { cache: true, cacheTTL: 2 * 60 * 1000 }
      );
      setInspections(data.inspections || []);
    } catch (error) {
      logger.error('Error fetching inspections', error);
    } finally {
      setLoading(false);
    }
  }, [token, propertyId]);

  useEffect(() => {
    fetchInspections();
  }, [fetchInspections]);

  const handleSave = async () => {
    try {
      await apiClient.post(
        '/inspections',
        {
          ...formData,
          scheduledDate: new Date(formData.scheduledDate),
        },
        token || undefined
      );

      Alert.alert('Success', 'Inspection scheduled');
      await fetchInspections();
      setShowForm(false);
    } catch (error: any) {
      logger.error('Error scheduling inspection', error);
      Alert.alert('Error', error.message || 'Failed to schedule inspection');
    }
  };

  const inspectionTypes = [
    { value: 'routine', label: 'Routine Inspection', icon: '📋' },
    { value: 'check_in', label: 'Check-In', icon: '🔑' },
    { value: 'check_out', label: 'Check-Out', icon: '🚪' },
    { value: 'maintenance', label: 'Maintenance', icon: '🔧' },
    { value: 'compliance', label: 'Compliance', icon: '✅' },
    { value: 'complaint', label: 'Complaint', icon: '⚠️' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return { bg: '#d1fae5', text: '#059669' };
      case 'scheduled':
        return { bg: '#dbeafe', text: '#2563eb' };
      case 'cancelled':
        return { bg: '#fee2e2', text: '#dc2626' };
      default:
        return { bg: '#f3f4f6', text: '#6b7280' };
    }
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title="Inspections"
        rightAction={
          <TouchableOpacity onPress={() => setShowForm(true)} style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Schedule</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView style={styles.scrollView}>

        {showForm ? (
          <View style={styles.content}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Schedule New Inspection</Text>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Inspection Type</Text>
                {inspectionTypes.map((type) => (
                  <TouchableOpacity
                    key={type.value}
                    style={[
                      styles.typeOption,
                      formData.inspectionType === type.value && styles.typeOptionSelected,
                    ]}
                    onPress={() => setFormData({ ...formData, inspectionType: type.value })}
                  >
                    <Text style={styles.typeIcon}>{type.icon}</Text>
                    <Text
                      style={[
                        styles.typeText,
                        formData.inspectionType === type.value && styles.typeTextSelected,
                      ]}
                    >
                      {type.label}
                    </Text>
                    {formData.inspectionType === type.value && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              {!propertyId && (
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Property ID</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.propertyId}
                    onChangeText={(text) => setFormData({ ...formData, propertyId: text })}
                    placeholder="Enter property ID"
                  />
                </View>
              )}

              <View style={styles.formGroup}>
                <Text style={styles.label}>Scheduled Date</Text>
                <TextInput
                  style={styles.input}
                  value={formData.scheduledDate}
                  onChangeText={(text) => setFormData({ ...formData, scheduledDate: text })}
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
                  <Text style={styles.saveButtonText}>Schedule</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.content}>
            {inspections.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>🔍</Text>
                <Text style={styles.emptyTitle}>No Inspections</Text>
                <Text style={styles.emptyText}>
                  Schedule property inspections to track condition and compliance.
                </Text>
              </View>
            ) : (
              inspections.map((inspection) => {
                const statusColors = getStatusColor(inspection.status);
                const typeInfo = inspectionTypes.find((t) => t.value === inspection.inspectionType);
                return (
                  <View key={inspection._id} style={styles.card}>
                    <View style={styles.cardHeader}>
                      <View style={styles.cardHeaderLeft}>
                        <Text style={styles.typeIcon}>{typeInfo?.icon || '📋'}</Text>
                        <View>
                          <Text style={styles.cardTitle}>{typeInfo?.label || inspection.inspectionType}</Text>
                          <Text style={styles.cardSubtitle}>
                            {inspection.propertyId?.address
                              ? `${inspection.propertyId.address.line1}, ${inspection.propertyId.address.city}`
                              : 'Property'}
                          </Text>
                        </View>
                      </View>
                      <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
                        <Text style={[styles.statusText, { color: statusColors.text }]}>
                          {inspection.status.toUpperCase()}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.label}>Scheduled Date</Text>
                      <Text style={styles.value}>
                        {new Date(inspection.scheduledDate).toLocaleDateString()}
                      </Text>
                    </View>

                    {inspection.actualDate && (
                      <View style={styles.detailRow}>
                        <Text style={styles.label}>Completed Date</Text>
                        <Text style={styles.value}>
                          {new Date(inspection.actualDate).toLocaleDateString()}
                        </Text>
                      </View>
                    )}

                    {inspection.overallCondition && (
                      <View style={styles.detailRow}>
                        <Text style={styles.label}>Overall Condition</Text>
                        <Text style={styles.value}>{inspection.overallCondition}</Text>
                      </View>
                    )}

                    {inspection.issuesFound && (
                      <View style={styles.issuesContainer}>
                        <Text style={styles.issuesLabel}>⚠️ Issues Found</Text>
                        {inspection.issues?.map((issue: any, idx: number) => (
                          <Text key={idx} style={styles.issueText}>
                            • {issue.description}
                          </Text>
                        ))}
                      </View>
                    )}

                    {inspection.notes && (
                      <View style={styles.notesContainer}>
                        <Text style={styles.label}>Notes</Text>
                        <Text style={styles.notes}>{inspection.notes}</Text>
                      </View>
                    )}
                  </View>
                );
              })
            )}
          </View>
        )}
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
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  typeIcon: {
    fontSize: 24,
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
  issuesContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    marginBottom: 12,
  },
  issuesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#d97706',
    marginBottom: 8,
  },
  issueText: {
    fontSize: 14,
    color: '#92400e',
    marginBottom: 4,
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
  typeOption: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  typeOptionSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#f0f4ff',
  },
  typeText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  typeTextSelected: {
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

export default InspectionsScreen;
