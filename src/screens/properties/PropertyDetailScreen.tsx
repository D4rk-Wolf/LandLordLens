import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Skeleton } from '../../components/ui/Skeleton';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';
import PageHeader from '../../components/ui/PageHeader';

interface PropertyDetailScreenProps {
  propertyId: string;
  onNavigate: (screen: string) => void;
  onBack: () => void;
  onSignOut: () => void;
}

const PropertyDetailScreen: React.FC<PropertyDetailScreenProps> = ({
  propertyId,
  onNavigate,
  onBack,
  onSignOut,
}) => {
  const { token } = useAuth();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProperty = useCallback(async () => {
    if (!token) return;

    try {
      const data = await apiClient.get<any>(
        `/properties/${propertyId}`,
        token,
        { cache: true, cacheTTL: 2 * 60 * 1000 }
      );
      setProperty(data);
    } catch (error) {
      logger.error('Error fetching property', error);
      Alert.alert('Error', 'Failed to load property details');
    } finally {
      setLoading(false);
    }
  }, [propertyId, token]);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  const breadcrumbs = [
    { label: 'Dashboard', onPress: () => onNavigate('dashboard') },
    { label: 'Properties', onPress: onBack },
    { label: property?.property?.address?.line1 || 'Details', onPress: undefined },
  ];

  if (loading) {
    return (
      <View style={styles.container}>
        <PageHeader
          title="Loading..."
          onSignOut={onSignOut}
          leftAction={
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
          }
        />
        <View style={{ padding: 24, gap: 24 }}>
          {/* Hero Skeleton */}
          <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
            <Skeleton width={64} height={64} borderRadius={16} />
            <View style={{ gap: 8 }}>
              <Skeleton width={200} height={28} />
              <Skeleton width={150} height={20} />
            </View>
          </View>

          {/* Section 1 Skeleton */}
          <View style={{ padding: 24, backgroundColor: 'white', borderRadius: 16, gap: 16 }}>
            <Skeleton width={180} height={24} />
            <View style={{ flexDirection: 'row', gap: 24, flexWrap: 'wrap' }}>
              <Skeleton width={100} height={40} />
              <Skeleton width={100} height={40} />
              <Skeleton width={100} height={40} />
            </View>
          </View>

          {/* Section 2 Skeleton */}
          <View style={{ padding: 24, backgroundColor: 'white', borderRadius: 16 }}>
            <Skeleton width="100%" height={100} />
          </View>
        </View>
      </View>
    );
  }

  if (!property) {
    return (
      <View style={styles.container}>
        <PageHeader
          title="Not Found"
          onSignOut={onSignOut}
          leftAction={
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
          }
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>🏠</Text>
          <Text style={styles.errorTitle}>Property Not Found</Text>
          <Text style={styles.errorText}>The property you're looking for doesn't exist or has been removed.</Text>
          <TouchableOpacity onPress={onBack} style={styles.addButtonLarge}>
            <Text style={styles.addButtonLargeText}>← Return to Properties</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Property Details"
        onSignOut={onSignOut}
        breadcrumbs={breadcrumbs}
        leftAction={
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView style={styles.scrollView}>

        <View style={styles.content}>
          <View style={styles.heroSection}>
            <View style={styles.heroContent}>
              <View style={styles.heroIconContainer}>
                <Text style={styles.heroIcon}>🏠</Text>
              </View>
              <View style={styles.heroText}>
                <Text style={styles.heroAddress}>
                  {property.property.address.line1}
                  {property.property.address.line2 && `, ${property.property.address.line2}`}
                </Text>
                <Text style={styles.heroLocation}>
                  {property.property.address.city}, {property.property.address.postcode}
                </Text>
              </View>
            </View>
            <View style={styles.heroBadges}>
              <View style={[styles.heroBadge, { backgroundColor: '#dbeafe' }]}>
                <Text style={[styles.heroBadgeText, { color: '#2563eb' }]}>
                  {property.property.propertyType.charAt(0).toUpperCase() + property.property.propertyType.slice(1)}
                </Text>
              </View>
              <View style={[styles.heroBadge, { backgroundColor: '#d1fae5' }]}>
                <Text style={[styles.heroBadgeText, { color: '#059669' }]}>
                  {property.property.bedrooms} {property.property.bedrooms === 1 ? 'Bed' : 'Beds'}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>🏠</Text>
              <Text style={styles.sectionTitle}>Property Information</Text>
            </View>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Type</Text>
                <Text style={styles.infoValue}>{property.property.propertyType}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Bedrooms</Text>
                <Text style={styles.infoValue}>{property.property.bedrooms}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Bathrooms</Text>
                <Text style={styles.infoValue}>{property.property.bathrooms || 'N/A'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Status</Text>
                <View style={[styles.statusBadge, (styles as any)[`status${property.property.status}`]]}>
                  <Text style={styles.statusText}>{property.property.status}</Text>
                </View>
              </View>
              {property.property.rentAmount && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Monthly Rent</Text>
                  <Text style={[styles.infoValue, styles.rentAmount]}>£{property.property.rentAmount}</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeaderWithButton}>
              <View>
                <Text style={styles.sectionTitle}>Tenancies ({property.tenancies?.length || 0})</Text>
                <Text style={styles.sectionSubtitle}>
                  Manage tenant information and documentation
                </Text>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => onNavigate(`new-tenancy-${propertyId}`)}
                activeOpacity={0.8}
              >
                <Text style={styles.addButtonIcon}>➕</Text>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
            {property.tenancies && property.tenancies.length > 0 ? (
              property.tenancies.map((tenancy: any) => (
                <View key={tenancy._id} style={styles.tenancyCard}>
                  <View style={styles.tenancyCardHeader}>
                    <View style={styles.tenancyInfo}>
                      <View style={styles.tenancyAvatar}>
                        <Text style={styles.tenancyAvatarText}>
                          {tenancy.tenantName.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                      <View style={styles.tenancyDetails}>
                        <Text style={styles.tenancyName}>{tenancy.tenantName}</Text>
                        <Text style={styles.tenancyEmail}>{tenancy.tenantEmail}</Text>
                        <Text style={styles.tenancyRent}>£{tenancy.monthlyRent}/month</Text>
                      </View>
                    </View>
                    <View style={[styles.tenancyStatusBadge, { backgroundColor: tenancy.status === 'active' ? '#d1fae5' : '#f3f4f6' }]}>
                      <Text style={[styles.tenancyStatusText, { color: tenancy.status === 'active' ? '#059669' : '#6b7280' }]}>
                        {tenancy.status}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tenancyActions}>
                    <TouchableOpacity
                      style={styles.tenancyActionButton}
                      onPress={() => onNavigate(`deposit-protection-${tenancy._id}`)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.tenancyActionIcon}>💷</Text>
                      <Text style={styles.tenancyActionText}>Deposit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.tenancyActionButton}
                      onPress={() => onNavigate(`right-to-rent-${tenancy._id}`)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.tenancyActionIcon}>📄</Text>
                      <Text style={styles.tenancyActionText}>Right to Rent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.tenancyActionButton}
                      onPress={() => onNavigate(`background-check-${tenancy._id}`)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.tenancyActionIcon}>🔍</Text>
                      <Text style={styles.tenancyActionText}>Check</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.tenancyActionButton}
                      onPress={() => onNavigate(`inventory-${tenancy._id}`)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.tenancyActionIcon}>📋</Text>
                      <Text style={styles.tenancyActionText}>Inventory</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyStateCard}>
                <Text style={styles.emptyStateIcon}>👥</Text>
                <Text style={styles.emptyStateTitle}>No Tenancies</Text>
                <Text style={styles.emptyStateText}>
                  Add a tenancy to start managing tenant information and documentation.
                </Text>
                <TouchableOpacity
                  style={styles.emptyStateButton}
                  onPress={() => onNavigate(`new-tenancy-${propertyId}`)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.emptyStateButtonText}>Add First Tenancy</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeaderWithButton}>
              <View>
                <Text style={styles.sectionTitle}>
                  Compliance Records ({property.complianceRecords?.length || 0})
                </Text>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => onNavigate(`new-compliance-${propertyId}`)}
              >
                <Text style={styles.addButtonText}>+ Add</Text>
              </TouchableOpacity>
            </View>
            {property.complianceRecords && property.complianceRecords.length > 0 ? (
              property.complianceRecords.map((record: any) => (
                <View key={record._id} style={styles.item}>
                  <Text style={styles.itemTitle}>{record.complianceType}</Text>
                  <Text style={styles.itemText}>
                    Expires: {new Date(record.expiryDate).toLocaleDateString()}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No compliance records</Text>
            )}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeaderWithButton}>
              <View>
                <Text style={styles.sectionTitle}>
                  Maintenance Tickets ({property.maintenanceTickets?.length || 0})
                </Text>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => onNavigate(`new-maintenance-${propertyId}`)}
              >
                <Text style={styles.addButtonText}>+ Add</Text>
              </TouchableOpacity>
            </View>
            {property.maintenanceTickets && property.maintenanceTickets.length > 0 ? (
              property.maintenanceTickets.map((ticket: any) => (
                <View key={ticket._id} style={styles.item}>
                  <Text style={styles.itemTitle}>{ticket.title}</Text>
                  <Text style={styles.itemText}>Status: {ticket.status}</Text>
                  <Text style={styles.itemText}>Priority: {ticket.priority}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No maintenance tickets</Text>
            )}
          </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#7f8c8d',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 40,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
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
  content: {
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
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  addressContainer: {
    paddingLeft: 34,
  },
  addressLine: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
  },
  addressCity: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  infoGrid: {
    paddingLeft: 34,
  },
  infoItem: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7f8c8d',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 18,
    color: '#2c3e50',
    fontWeight: '500',
  },
  rentAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 5,
  },
  statusvacant: {
    backgroundColor: '#e8f5e9',
  },
  statusoccupied: {
    backgroundColor: '#e3f2fd',
  },
  statusmaintenance: {
    backgroundColor: '#fff3e0',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  card: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyState: {
    padding: 30,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 10,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  sectionHeaderWithButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 4px 0px rgba(99, 102, 241, 0.2)',
    elevation: 2,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  item: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
  },
  itemText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 3,
  },
  heroSection: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  heroIcon: {
    fontSize: 32,
  },
  heroText: {
    flex: 1,
  },
  heroAddress: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  heroLocation: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  heroBadges: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  heroBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  heroBadgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  tenancyCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  tenancyCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tenancyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tenancyAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tenancyAvatarText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  tenancyDetails: {
    flex: 1,
  },
  tenancyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  tenancyEmail: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  tenancyRent: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
  },
  tenancyStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tenancyStatusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  tenancyActions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  tenancyActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: '#e0e7ff',
  },
  tenancyActionIcon: {
    fontSize: 16,
  },
  tenancyActionText: {
    color: '#6366f1',
    fontSize: 13,
    fontWeight: '600',
  },
  emptyStateCard: {
    backgroundColor: '#ffffff',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
    maxWidth: 280,
  },
  emptyStateButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  emptyStateButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  addButtonIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  addButtonLarge: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    boxShadow: '0px 4px 6px -1px rgba(99, 102, 241, 0.4)',
    elevation: 3,
  },
  addButtonLargeText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PropertyDetailScreen;
