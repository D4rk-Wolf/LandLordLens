import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';

interface ExpensesScreenProps {
  onNavigate: (screen: string) => void;
  propertyId?: string;
}

const ExpensesScreen: React.FC<ExpensesScreenProps> = ({ onNavigate, propertyId }) => {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    propertyId: propertyId || '',
    type: 'maintenance_repairs',
    category: 'repairs',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    supplier: '',
    invoiceNumber: '',
    isTaxDeductible: true,
  });

  const fetchExpenses = useCallback(async () => {
    if (!token) return;

    try {
      const endpoint = propertyId ? `/expenses?propertyId=${propertyId}` : '/expenses';
      const data = await apiClient.get<{ expenses: any[] }>(
        endpoint,
        token,
        { cache: true, cacheTTL: 2 * 60 * 1000 }
      );
      setExpenses(data.expenses || []);
    } catch (error) {
      logger.error('Error fetching expenses', error);
    } finally {
      setLoading(false);
    }
  }, [token, propertyId]);

  const fetchSummary = useCallback(async () => {
    if (!token) return;

    try {
      const data = await apiClient.get<{ summary: any }>(
        '/expenses/summary',
        token,
        { cache: true, cacheTTL: 2 * 60 * 1000 }
      );
      setSummary(data.summary);
    } catch (error) {
      logger.error('Error fetching summary', error);
    }
  }, [token]);

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, [fetchExpenses, fetchSummary]);

  const handleSave = async () => {
    try {
      await apiClient.post(
        '/expenses',
        {
          ...formData,
          amount: parseFloat(formData.amount),
          date: new Date(formData.date),
          propertyId: formData.propertyId || undefined,
        },
        token
      );

      Alert.alert('Success', 'Expense saved');
      await fetchExpenses();
      await fetchSummary();
      setShowForm(false);
      setFormData({
        propertyId: propertyId || '',
        type: 'maintenance_repairs',
        category: 'repairs',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        supplier: '',
        invoiceNumber: '',
        isTaxDeductible: true,
      });
    } catch (error: any) {
      logger.error('Error saving expense', error);
      Alert.alert('Error', error.message || 'Failed to save expense');
    }
  };

  const expenseTypes = [
    { value: 'maintenance_repairs', label: 'Maintenance & Repairs', category: 'repairs' },
    { value: 'letting_agent_fees', label: 'Letting Agent Fees', category: 'legal' },
    { value: 'legal_fees', label: 'Legal Fees', category: 'legal' },
    { value: 'accountant_fees', label: 'Accountant Fees', category: 'accounting' },
    { value: 'insurance', label: 'Insurance', category: 'insurance' },
    { value: 'utility_bills', label: 'Utility Bills', category: 'utilities' },
    { value: 'cleaning_services', label: 'Cleaning Services', category: 'cleaning' },
    { value: 'advertising', label: 'Advertising', category: 'advertising' },
    { value: 'replacement_domestic_items', label: 'Replacement Items', category: 'repairs' },
    { value: 'property_improvements', label: 'Property Improvements', category: 'improvements' },
  ];

  const categories = [
    { value: 'repairs', label: 'Repairs', icon: '🔧' },
    { value: 'maintenance', label: 'Maintenance', icon: '🛠️' },
    { value: 'insurance', label: 'Insurance', icon: '🛡️' },
    { value: 'legal', label: 'Legal', icon: '⚖️' },
    { value: 'accounting', label: 'Accounting', icon: '📊' },
    { value: 'advertising', label: 'Advertising', icon: '📢' },
    { value: 'utilities', label: 'Utilities', icon: '💡' },
    { value: 'cleaning', label: 'Cleaning', icon: '🧹' },
    { value: 'improvements', label: 'Improvements', icon: '🏗️' },
    { value: 'other', label: 'Other', icon: '📦' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Expenses & Tax</Text>
        <TouchableOpacity onPress={() => setShowForm(true)} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {summary && (
        <View style={styles.content}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Tax Year Summary</Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Total Expenses</Text>
                <Text style={styles.summaryValue}>£{summary.total?.toFixed(2) || '0.00'}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Tax Deductible</Text>
                <Text style={styles.summaryValue}>£{summary.taxDeductible?.toFixed(2) || '0.00'}</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {showForm ? (
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>New Expense</Text>

            {!propertyId && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>Property ID (optional)</Text>
                <TextInput
                  style={styles.input}
                  value={formData.propertyId}
                  onChangeText={(text) => setFormData({ ...formData, propertyId: text })}
                  placeholder="Enter property ID"
                />
              </View>
            )}

            <View style={styles.formGroup}>
              <Text style={styles.label}>Expense Type</Text>
              {expenseTypes.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  style={[
                    styles.option,
                    formData.type === type.value && styles.optionSelected,
                  ]}
                  onPress={() =>
                    setFormData({
                      ...formData,
                      type: type.value,
                      category: type.category,
                    })
                  }
                >
                  <Text
                    style={[
                      styles.optionText,
                      formData.type === type.value && styles.optionTextSelected,
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
              <Text style={styles.label}>Category</Text>
              <View style={styles.categoryGrid}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.value}
                    style={[
                      styles.categoryOption,
                      formData.category === cat.value && styles.categoryOptionSelected,
                    ]}
                    onPress={() => setFormData({ ...formData, category: cat.value })}
                  >
                    <Text style={styles.categoryIcon}>{cat.icon}</Text>
                    <Text
                      style={[
                        styles.categoryText,
                        formData.category === cat.value && styles.categoryTextSelected,
                      ]}
                    >
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Amount (£)</Text>
              <TextInput
                style={styles.input}
                value={formData.amount}
                onChangeText={(text) => setFormData({ ...formData, amount: text })}
                keyboardType="numeric"
                placeholder="0.00"
              />
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
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                multiline
                numberOfLines={3}
                placeholder="Describe the expense..."
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Supplier (optional)</Text>
              <TextInput
                style={styles.input}
                value={formData.supplier}
                onChangeText={(text) => setFormData({ ...formData, supplier: text })}
                placeholder="Supplier name"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Invoice Number (optional)</Text>
              <TextInput
                style={styles.input}
                value={formData.invoiceNumber}
                onChangeText={(text) => setFormData({ ...formData, invoiceNumber: text })}
                placeholder="Invoice number"
              />
            </View>

            <View style={styles.formGroup}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() =>
                  setFormData({ ...formData, isTaxDeductible: !formData.isTaxDeductible })
                }
              >
                <View
                  style={[
                    styles.checkboxBox,
                    formData.isTaxDeductible && styles.checkboxBoxChecked,
                  ]}
                >
                  {formData.isTaxDeductible && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>Tax Deductible</Text>
              </TouchableOpacity>
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
          {expenses.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>💰</Text>
              <Text style={styles.emptyTitle}>No Expenses</Text>
              <Text style={styles.emptyText}>
                Track your property expenses for tax reporting and financial management.
              </Text>
            </View>
          ) : (
            expenses.map((expense) => {
              const typeInfo = expenseTypes.find((t) => t.value === expense.type);
              const categoryInfo = categories.find((c) => c.value === expense.category);
              return (
                <View key={expense._id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <View style={styles.cardHeaderLeft}>
                      <Text style={styles.categoryIcon}>{categoryInfo?.icon || '📦'}</Text>
                      <View>
                        <Text style={styles.cardTitle}>{typeInfo?.label || expense.type}</Text>
                        <Text style={styles.cardSubtitle}>
                          {expense.propertyId?.address
                            ? `${expense.propertyId.address.line1}, ${expense.propertyId.address.city}`
                            : 'General Expense'}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.amount}>£{expense.amount?.toFixed(2)}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.value}>
                      {new Date(expense.date).toLocaleDateString()}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Description</Text>
                    <Text style={styles.value}>{expense.description}</Text>
                  </View>

                  {expense.supplier && (
                    <View style={styles.detailRow}>
                      <Text style={styles.label}>Supplier</Text>
                      <Text style={styles.value}>{expense.supplier}</Text>
                    </View>
                  )}

                  <View style={styles.detailRow}>
                    <View style={styles.badgeRow}>
                      <View
                        style={[
                          styles.badge,
                          expense.isTaxDeductible
                            ? { backgroundColor: '#d1fae5' }
                            : { backgroundColor: '#fee2e2' },
                        ]}
                      >
                        <Text
                          style={[
                            styles.badgeText,
                            expense.isTaxDeductible ? { color: '#059669' } : { color: '#dc2626' },
                          ]}
                        >
                          {expense.isTaxDeductible ? 'Tax Deductible' : 'Not Deductible'}
                        </Text>
                      </View>
                      {expense.taxYear && (
                        <View style={[styles.badge, { backgroundColor: '#dbeafe' }]}>
                          <Text style={[styles.badgeText, { color: '#2563eb' }]}>
                            {expense.taxYear}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
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
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 16,
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
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
  categoryIcon: {
    fontSize: 24,
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#dc2626',
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
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
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
    height: 80,
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
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryOption: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    minWidth: 100,
  },
  categoryOptionSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#f0f4ff',
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    color: '#374151',
  },
  categoryTextSelected: {
    color: '#6366f1',
    fontWeight: '600',
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

export default ExpensesScreen;
