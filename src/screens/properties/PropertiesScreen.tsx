import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { API_URL } from '../../utils/constants';
import { logger } from '../../utils/logger';

interface Property {
  _id: string;
  address: {
    line1: string;
    city: string;
    postcode: string;
  };
  propertyType: string;
  bedrooms: number;
  status: string;
  availabilityStatus?: string;
}

interface PropertiesScreenProps {
  onNavigate: (screen: string) => void;
  onSelectProperty: (id: string) => void;
}

const PropertiesScreen: React.FC<PropertiesScreenProps> = ({ onNavigate, onSelectProperty }) => {
  const { token } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = useCallback(async () => {
    if (!token) return;

    try {
      const data = await apiClient.get<{ properties: Property[] }>(
        '/properties',
        token,
        { cache: true, cacheTTL: 2 * 60 * 1000 }
      );
      setProperties(data.properties || []);
    } catch (error) {
      logger.error('Error fetching properties', error);
      Alert.alert('Error', 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const getStatusConfig = useCallback((status: string) => {
    const configs: Record<string, { color: string; bgColor: string; label: string }> = {
      vacant: { color: '#059669', bgColor: '#d1fae5', label: 'Vacant' },
      occupied: { color: '#2563eb', bgColor: '#dbeafe', label: 'Occupied' },
      maintenance: { color: '#d97706', bgColor: '#fef3c7', label: 'Maintenance' },
    };
    return configs[status.toLowerCase()] || { color: '#6b7280', bgColor: '#f3f4f6', label: status };
  }, []);

  const getAvailabilityConfig = useCallback((availabilityStatus?: string) => {
    const configs: Record<string, { color: string; bgColor: string; label: string; icon: string }> = {
      free: { color: '#059669', bgColor: '#d1fae5', label: 'Free', icon: '🆓' },
      for_sale: { color: '#6366f1', bgColor: '#e0e7ff', label: 'For Sale', icon: '💰' },
      ready_for_rent: { color: '#2563eb', bgColor: '#dbeafe', label: 'Ready for Rent', icon: '🏠' },
      rented: { color: '#10b981', bgColor: '#d1fae5', label: 'Rented', icon: '✅' },
      not_available: { color: '#6b7280', bgColor: '#f3f4f6', label: 'Not Available', icon: '🚫' },
    };
    return configs[availabilityStatus?.toLowerCase() || ''] || { color: '#6b7280', bgColor: '#f3f4f6', label: 'Unknown', icon: '❓' };
  }, []);

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>Properties</Text>
              <Text style={styles.subtitle}>
                {properties.length} {properties.length === 1 ? 'property' : 'properties'} registered
              </Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => onNavigate('new-property')}
              activeOpacity={0.85}
            >
              <View style={styles.addButtonIconContainer}>
                <Text style={styles.addButtonIcon}>➕</Text>
              </View>
              <Text style={styles.addButtonText}>Add Property</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Loading properties...</Text>
        </View>
      ) : properties.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Text style={styles.emptyIcon}>🏠</Text>
          </View>
          <Text style={styles.emptyTitle}>No Properties Yet</Text>
          <Text style={styles.emptyText}>
            Start managing your properties by adding your first property to the system.
          </Text>
          <TouchableOpacity
            style={styles.addButtonLarge}
            onPress={() => onNavigate('new-property')}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonLargeText}>➕ Add Your First Property</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <View style={styles.list}>
            {properties.map((property) => {
              const statusConfig = getStatusConfig(property.status);
              const availabilityConfig = getAvailabilityConfig(property.availabilityStatus);
              return (
                <TouchableOpacity
                  key={property._id}
                  style={styles.propertyCard}
                  onPress={() => onSelectProperty(property._id)}
                  activeOpacity={0.75}
                >
                  <View style={styles.propertyCardHeader}>
                    <View style={styles.propertyAddressContainer}>
                      <View style={styles.propertyIconContainer}>
                        <Text style={styles.propertyIcon}>🏠</Text>
                      </View>
                      <View style={styles.propertyAddressText}>
                        <Text style={styles.propertyAddress} numberOfLines={1}>
                          {property.address.line1}
                        </Text>
                        <Text style={styles.propertyCity} numberOfLines={1}>
                          {property.address.city}, {property.address.postcode}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.badgesContainer}>
                      <View style={[
                        styles.availabilityBadge, 
                        { 
                          backgroundColor: availabilityConfig.bgColor,
                          borderColor: `${availabilityConfig.color}30`,
                        }
                      ]}>
                        <Text style={styles.availabilityIcon}>{availabilityConfig.icon}</Text>
                        <Text style={[styles.availabilityText, { color: availabilityConfig.color }]}>
                          {availabilityConfig.label}
                        </Text>
                      </View>
                      <View style={[
                        styles.statusBadge, 
                        { 
                          backgroundColor: statusConfig.bgColor,
                          borderColor: `${statusConfig.color}30`,
                        }
                      ]}>
                        <Text style={[styles.statusText, { color: statusConfig.color }]}>
                          {statusConfig.label}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.propertyDetails}>
                    <View style={styles.propertyDetailItem}>
                      <View style={styles.propertyDetailIconContainer}>
                        <Text style={styles.propertyDetailIcon}>🏘️</Text>
                      </View>
                      <Text style={styles.propertyDetailText}>
                        {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
                      </Text>
                    </View>
                    <View style={styles.propertyDetailItem}>
                      <View style={styles.propertyDetailIconContainer}>
                        <Text style={styles.propertyDetailIcon}>🛏️</Text>
                      </View>
                      <Text style={styles.propertyDetailText}>
                        {property.bedrooms} {property.bedrooms === 1 ? 'bedroom' : 'bedrooms'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.propertyCardFooter}>
                    <View style={styles.viewDetailsContainer}>
                      <Text style={styles.viewDetailsText}>View Details</Text>
                      <Text style={styles.viewDetailsArrow}>→</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 48,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    position: 'relative',
  },
  headerContent: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    letterSpacing: -1.5,
    lineHeight: 56,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '400',
    lineHeight: 24,
  },
  addButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 6px 12px 0px rgba(99, 102, 241, 0.35)',
    elevation: 6,
    gap: 10,
    borderWidth: 0,
  },
  addButtonIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonIcon: {
    fontSize: 18,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.3,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    minHeight: 400,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    minHeight: 500,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  emptyIconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 4,
    borderColor: '#e0e7ff',
    boxShadow: '0px 8px 16px 0px rgba(99, 102, 241, 0.15)',
    elevation: 4,
  },
  emptyIcon: {
    fontSize: 72,
  },
  emptyTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 16,
    letterSpacing: -1,
    lineHeight: 40,
  },
  emptyText: {
    fontSize: 17,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 400,
    lineHeight: 28,
    fontWeight: '400',
  },
  addButtonLarge: {
    backgroundColor: '#6366f1',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 14,
    boxShadow: '0px 6px 12px 0px rgba(99, 102, 241, 0.35)',
    elevation: 6,
  },
  addButtonLargeText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  listContainer: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 32,
  },
  list: {
    paddingTop: 32,
    gap: 20,
  },
  propertyCard: {
    backgroundColor: '#ffffff',
    padding: 28,
    borderRadius: 20,
    marginBottom: 20,
    boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.08)',
    elevation: 3,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    position: 'relative',
    overflow: 'hidden',
  },
  propertyCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 16,
  },
  propertyAddressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    minWidth: 200,
  },
  propertyIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#e0e7ff',
  },
  propertyIcon: {
    fontSize: 28,
  },
  propertyAddressText: {
    flex: 1,
    paddingTop: 4,
  },
  propertyAddress: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
    letterSpacing: -0.5,
    lineHeight: 28,
  },
  propertyCity: {
    fontSize: 15,
    color: '#6b7280',
    fontWeight: '400',
    lineHeight: 22,
  },
  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 22,
    alignSelf: 'flex-start',
    borderWidth: 1.5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
    letterSpacing: 0.3,
  },
  propertyDetails: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 20,
    paddingTop: 20,
    borderTopWidth: 1.5,
    borderTopColor: '#f3f4f6',
  },
  propertyDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  propertyDetailIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  propertyDetailIcon: {
    fontSize: 18,
  },
  propertyDetailText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  propertyCardFooter: {
    paddingTop: 16,
    borderTopWidth: 1.5,
    borderTopColor: '#f3f4f6',
  },
  viewDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f4ff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  viewDetailsText: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '700',
    marginRight: 8,
    letterSpacing: 0.3,
  },
  viewDetailsArrow: {
    fontSize: 18,
    color: '#6366f1',
    fontWeight: '700',
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  availabilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 22,
    gap: 6,
    borderWidth: 1.5,
  },
  availabilityIcon: {
    fontSize: 14,
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default React.memo(PropertiesScreen);
