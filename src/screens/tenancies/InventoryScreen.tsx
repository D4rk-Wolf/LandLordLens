import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';

interface InventoryScreenProps {
  tenancyId: string;
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

const InventoryScreen: React.FC<InventoryScreenProps> = ({
  tenancyId,
  onNavigate,
  onBack,
}) => {
  const { token } = useAuth();
  const [inventories, setInventories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'check_in',
    date: new Date().toISOString().split('T')[0],
    conductedBy: '',
    tenantPresent: false,
    notes: '',
  });

  const fetchInventories = useCallback(async () => {
    if (!token) return;

    try {
      const data = await apiClient.get<any>(
        `/tenancies/${tenancyId}`,
        token,
        { cache: true, cacheTTL: 2 * 60 * 1000 }
      );
      setInventories(data.inventories || []);
    } catch (error) {
      logger.error('Error fetching inventories', error);
    } finally {
      setLoading(false);
    }
  }, [tenancyId, token]);

  useEffect(() => {
    fetchInventories();
  }, [fetchInventories]);

  const handleSave = async () => {
    try {
      await apiClient.post(
        `/tenancies/${tenancyId}/inventory`,
        {
          ...formData,
          date: new Date(formData.date),
        },
        token
      );

      Alert.alert('Success', 'Inventory record saved');
      await fetchInventories();
      setShowForm(false);
    } catch (error: any) {
      logger.error('Error saving inventory', error);
      Alert.alert('Error', error.message || 'Failed to save inventory');
    }
  };

  const inventoryTypes = [
    { value: 'check_in', label: 'Check-In', icon: '🔑' },
    { value: 'check_out', label: 'Check-Out', icon: '🚪' },
    { value: 'interim', label: 'Interim', icon: '📋' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Inventory</Text>
        <TouchableOpacity onPress={() => setShowForm(true)} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {showForm ? (
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>New Inventory Record</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Inventory Type</Text>
              {inventoryTypes.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  style={[
                    styles.typeOption,
                    formData.type === type.value && styles.typeOptionSelected,
                  ]}
                  onPress={() => setFormData({ ...formData, type: type.value })}
                >
                  <Text style={styles.typeIcon}>{type.icon}</Text>
                  <Text
                    style={[
                      styles.typeText,
                      formData.type === type.value && styles.typeTextSelected,
                    ]}
                  >
                    {type.label}
                  </Text>
                  {formData.type === type.value && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Date</Text>
              <TextInput
                style={styles.input}
                value={formData.date}
                onChangeText={(text) => setFormData({ ...formData, date: text })}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Conducted By</Text>
              <TextInput
                style={styles.input}
                value={formData.conductedBy}
                onChangeText={(text) => setFormData({ ...formData, conductedBy: text })}
                placeholder="Your name"
              />
            </View>

            <View style={styles.formGroup}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() =>
                  setFormData({ ...formData, tenantPresent: !formData.tenantPresent })
                }
              >
                <View
                  style={[
                    styles.checkboxBox,
                    formData.tenantPresent && styles.checkboxBoxChecked,
                  ]}
                >
                  {formData.tenantPresent && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>Tenant Present</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.notes}
                onChangeText={(text) => setFormData({ ...formData, notes: text })}
                multiline
                numberOfLines={4}
                placeholder="Inventory notes and observations..."
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
          {inventories.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyTitle}>No Inventory Records</Text>
              <Text style={styles.emptyText}>
                Create inventory records for check-in, check-out, and interim inspections.
              </Text>
            </View>
          ) : (
            inventories.map((inventory) => {
              const typeInfo = inventoryTypes.find((t) => t.value === inventory.type);
              return (
                <View key={inventory._id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <View style={styles.cardHeaderLeft}>
                      <Text style={styles.typeIcon}>{typeInfo?.icon || '📋'}</Text>
                      <View>
                        <Text style={styles.cardTitle}>{typeInfo?.label || inventory.type}</Text>
                        <Text style={styles.cardSubtitle}>
                          {new Date(inventory.date).toLocaleDateString()}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Conducted By</Text>
                    <Text style={styles.value}>{inventory.conductedBy}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Tenant Present</Text>
                    <Text style={styles.value}>
                      {inventory.tenantPresent ? 'Yes' : 'No'}
                    </Text>
                  </View>

                  {inventory.overallCondition && (
                    <View style={styles.detailRow}>
                      <Text style={styles.label}>Overall Condition</Text>
                      <Text style={styles.value}>{inventory.overallCondition}</Text>
                    </View>
                  )}

                  {inventory.items && inventory.items.length > 0 && (
                    <View style={styles.itemsContainer}>
                      <Text style={styles.itemsTitle}>Items ({inventory.items.length})</Text>
                      {inventory.items.slice(0, 5).map((item: any, idx: number) => (
                        <Text key={idx} style={styles.itemText}>
                          • {item.name} ({item.room}) - {item.condition}
                        </Text>
                      ))}
                      {inventory.items.length > 5 && (
                        <Text style={styles.moreItems}>
                          +{inventory.items.length - 5} more items
                        </Text>
                      )}
                    </View>
                  )}

                  {inventory.notes && (
                    <View style={styles.notesContainer}>
                      <Text style={styles.label}>Notes</Text>
                      <Text style={styles.notes}>{inventory.notes}</Text>
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
  itemsContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  moreItems: {
    fontSize: 12,
    color: '#6b7280',
    fontStyle: 'italic',
    marginTop: 4,
  },
  notesContainer: {
    marginTop: 12,
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
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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

export default InventoryScreen;
