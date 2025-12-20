import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';
import PageHeader from '../../components/ui/PageHeader';

interface ComplianceRecord {
  _id: string;
  propertyId: string;
  complianceType: string;
  expiryDate: string;
  status: string;
  notes?: string;
}

interface ComplianceScreenProps {
  onNavigate: (screen: string) => void;
  onSignOut: () => void;
}

const ComplianceScreen: React.FC<ComplianceScreenProps> = ({ onNavigate, onSignOut }) => {
  const { token } = useAuth();
  const [records, setRecords] = useState<ComplianceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComplianceRecords = useCallback(async () => {
    if (!token) return;

    try {
      const propertiesData = await apiClient.get<{ properties: any[] }>(
        '/properties',
        token,
        { cache: true, cacheTTL: 2 * 60 * 1000 }
      );
      const properties = propertiesData.properties || [];
      
      if (properties.length === 0) {
        setRecords([]);
        setLoading(false);
        return;
      }

      // Fetch compliance records for all properties in parallel
      const propertyDetailRequests = properties.map((property) =>
        () => apiClient.get<any>(`/properties/${property._id}`, token, {
          cache: true,
          cacheTTL: 2 * 60 * 1000,
        }).then((propertyDetail) => {
          const complianceRecords = propertyDetail.complianceRecords || [];
          return complianceRecords.map((r: any) => ({
            ...r,
            propertyAddress: property.address,
          }));
        }).catch((error) => {
          logger.debug(`Failed to fetch compliance for property ${property._id}`, error);
          return [];
        })
      );

      const allRecordsArrays = await apiClient.parallel(propertyDetailRequests);
      const allRecords = allRecordsArrays.flat();
      
      setRecords(allRecords);
    } catch (error) {
      logger.error('Error fetching compliance records', error);
      Alert.alert('Error', 'Failed to load compliance records');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchComplianceRecords();
  }, [fetchComplianceRecords]);

  const getDaysUntilExpiry = (expiryDate: string): number => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusConfig = (expiryDate: string) => {
    const daysUntil = getDaysUntilExpiry(expiryDate);
    if (daysUntil < 0) {
      return { color: '#dc2626', bgColor: '#fee2e2', label: 'Expired', icon: '🔴' };
    }
    if (daysUntil < 30) {
      return { color: '#d97706', bgColor: '#fef3c7', label: `Expires in ${daysUntil} days`, icon: '🟠' };
    }
    return { color: '#059669', bgColor: '#d1fae5', label: 'Valid', icon: '🟢' };
  };

  const complianceTypes = [
    'Gas Safety Certificate',
    'Electrical Safety Certificate',
    'EPC Certificate',
    'HMO License',
    'Fire Safety Assessment',
    'Legionella Risk Assessment',
  ];

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Compliance" 
        onSignOut={onSignOut}
        rightAction={
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onNavigate('properties')}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonIcon}>➕</Text>
            <Text style={styles.addButtonText}>Add Record</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            Monitor and manage compliance documents for your properties
          </Text>
        </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.text}>Loading compliance records...</Text>
        </View>
      ) : records.length === 0 ? (
        <View style={styles.content}>
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Text style={styles.emptyIcon}>📋</Text>
            </View>
            <Text style={styles.emptyTitle}>No Compliance Records</Text>
            <Text style={styles.emptyText}>
              Track important compliance documents like gas safety certificates, EPCs, and HMO licenses.
            </Text>
            <TouchableOpacity
              style={styles.addButtonLarge}
              onPress={() => onNavigate('properties')}
              activeOpacity={0.8}
            >
              <Text style={styles.addButtonText}>Add Compliance Record</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Common Compliance Requirements</Text>
            <View style={styles.complianceTypesList}>
              {complianceTypes.map((type, index) => (
                <View key={index} style={styles.complianceTypeItem}>
                  <View style={styles.complianceTypeIcon}>
                    <Text style={styles.complianceTypeIconText}>✓</Text>
                  </View>
                  <Text style={styles.complianceTypeText}>{type}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.content}>
          {records.map((record) => {
            const statusConfig = getStatusConfig(record.expiryDate);
            return (
              <TouchableOpacity
                key={record._id}
                style={styles.recordCard}
                activeOpacity={0.7}
                onPress={() => {
                  // Could navigate to property detail or compliance detail
                  if (record.propertyId) {
                    onNavigate(`property-detail`);
                  }
                }}
              >
                <View style={styles.recordHeader}>
                  <View style={styles.recordTypeContainer}>
                    <View style={styles.recordIconContainer}>
                      <Text style={styles.recordIcon}>📄</Text>
                    </View>
                    <View style={styles.recordTypeText}>
                      <Text style={styles.recordType}>
                        {record.complianceType.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Text>
                      {record.propertyAddress && (
                        <Text style={styles.propertyAddress} numberOfLines={1}>
                          {record.propertyAddress.line1}, {record.propertyAddress.city}
                        </Text>
                      )}
                      <Text style={styles.expiryDate}>
                        Expires: {new Date(record.expiryDate).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: statusConfig.bgColor },
                    ]}
                  >
                    <Text style={styles.statusIcon}>{statusConfig.icon}</Text>
                    <Text
                      style={[
                        styles.statusText,
                        { color: statusConfig.color },
                      ]}
                    >
                      {statusConfig.label}
                    </Text>
                  </View>
                </View>
                {record.certificateNumber && (
                  <View style={styles.certificateContainer}>
                    <Text style={styles.certificateLabel}>Certificate:</Text>
                    <Text style={styles.certificateNumber}>{record.certificateNumber}</Text>
                  </View>
                )}
                {record.notes && (
                  <View style={styles.notesContainer}>
                    <Text style={styles.notesLabel}>Notes:</Text>
                    <Text style={styles.notes}>{record.notes}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
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
  subtitleContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '400',
  },
  addButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 4px 8px 0px rgba(99, 102, 241, 0.3)',
    elevation: 4,
    gap: 8,
  },
  addButtonIcon: {
    fontSize: 16,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    minHeight: 400,
  },
  text: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  emptyState: {
    backgroundColor: '#ffffff',
    padding: 40,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.05)',
    elevation: 2,
    marginBottom: 20,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
    maxWidth: 300,
  },
  addButtonLarge: {
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    boxShadow: '0px 4px 8px 0px rgba(99, 102, 241, 0.3)',
    elevation: 4,
  },
  infoSection: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  complianceTypesList: {
    gap: 12,
  },
  complianceTypeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  complianceTypeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#d1fae5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  complianceTypeIconText: {
    color: '#059669',
    fontSize: 12,
    fontWeight: '700',
  },
  complianceTypeText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  recordCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.05)',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  propertyAddress: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 2,
    marginBottom: 4,
  },
  certificateContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  certificateLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  certificateNumber: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    minHeight: 400,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recordTypeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 12,
  },
  recordIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recordIcon: {
    fontSize: 24,
  },
  recordTypeText: {
    flex: 1,
  },
  recordType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  expiryDate: {
    fontSize: 13,
    color: '#6b7280',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    flexShrink: 0,
  },
  statusIcon: {
    fontSize: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  notesContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  notes: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

export default ComplianceScreen;
