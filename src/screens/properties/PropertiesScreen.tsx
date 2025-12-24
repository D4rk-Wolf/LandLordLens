import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Skeleton } from '../../components/ui/Skeleton';
import Toast from '../../components/ui/Toast';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';
import PageHeader from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';

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
  const { token, user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date-desc');
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'error' | 'info' | 'warning' }>({
    visible: false,
    message: '',
    type: 'info',
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    setToast({ visible: true, message, type });
  };

  const fetchProperties = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      const data = await apiClient.get<{ properties: Property[] }>(
        '/properties',
        token,
        { cache: true, cacheTTL: 2 * 60 * 1000 }
      );
      setProperties(data.properties || []);
      setFilteredProperties(data.properties || []);
    } catch (error) {
      logger.error('Error fetching properties', error);
      showToast('Failed to load properties', 'error');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    let result = [...properties];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.address.line1.toLowerCase().includes(query) ||
          p.address.city.toLowerCase().includes(query) ||
          p.address.postcode.toLowerCase().includes(query) ||
          p.propertyType.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((p) => p.status === statusFilter);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b._id).getTime() - new Date(a._id).getTime();
        case 'date-asc':
          return new Date(a._id).getTime() - new Date(b._id).getTime();
        default:
          return 0;
      }
    });

    setFilteredProperties(result);
  }, [properties, searchQuery, statusFilter, sortBy]);

  const deleteProperty = useCallback(async (id: string) => {
    // @ts-ignore - web confirm
    if (window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      try {
        // Optimistically update properties
        setProperties(prev => prev.filter(p => p._id !== id));
        showToast('Property deleted successfully', 'success');

        await apiClient.delete(`/properties/${id}`, token || undefined);
      } catch (error) {
        logger.error('Error deleting property', error);
        showToast('Failed to delete property', 'error');
        // Revert if failed
        fetchProperties();
      }
    }
  }, [token, fetchProperties]);

  const getStatusConfig = useCallback((status: string) => {
    const configs: Record<string, { label: string; badge: string }> = {
      vacant: { label: 'Vacant', badge: 'success' },
      occupied: { label: 'Occupied', badge: 'info' },
      maintenance: { label: 'Maintenance', badge: 'warning' },
    };
    return configs[status.toLowerCase()] || { label: status, badge: 'info' };
  }, []);

  return (
    <View style={styles.container}>
      <PageHeader
        title="Properties"
        subtitle="Manage your portfolio"
        rightAction={
          <Button
            title="Add Property"
            onPress={() => {
              const startAddProperty = () => {
                onNavigate('new-property');
              };

              // Feature Verification: Free Tier Limit
              // Free tier is limited to 1 property.
              const isFreeTier = !user?.subscription || user.subscription === 'free';
              if (isFreeTier && properties.length >= 1) {
                // Using window.alert for web compatibility or a Toast
                // If Alert.alert is not reliably implemented for web in this env
                if (window.confirm('Free tier users are limited to 1 property. Upgrade to Pro for unlimited properties.\n\nGo to Settings to view plans?')) {
                  // In a real app, navigate to pricing/settings
                }
                return;
              }
              startAddProperty();
            }}
            icon="➕"
          />
        }
      />

      <View style={styles.filterBar}>
        <input
          type="text"
          className="input-saas"
          placeholder="Search address or type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, maxWidth: 400 }}
        />
        <View style={styles.filterGroup}>
          <Button
            title={`Status: ${statusFilter === 'all' ? 'All' : statusFilter}`}
            variant="secondary"
            onPress={() => setStatusFilter(statusFilter === 'all' ? 'vacant' : statusFilter === 'vacant' ? 'occupied' : 'all')}
          />
        </View>
      </View>

      <div style={{ flex: 1, overflow: 'hidden', paddingBottom: 20 }}>
        <div className="table-container">
          <table className="saas-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Status</th>
                <th>Availability</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // Skeleton Rows
                [1, 2, 3].map((i) => (
                  <tr key={i}>
                    <td colSpan={5}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                        <Skeleton width={40} height={40} borderRadius={8} />
                        <View>
                          <Skeleton width={180} height={20} style={{ marginBottom: 4 }} />
                          <Skeleton width={100} height={14} />
                        </View>
                      </View>
                    </td>
                  </tr>
                ))
              ) : filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 48 }}>
                    <Text style={{ color: 'var(--slate-500)', fontSize: 14 }}>No properties found.</Text>
                  </td>
                </tr>
              ) : (
                filteredProperties.map((property) => {
                  const statusConfig = getStatusConfig(property.status);
                  return (
                    <tr
                      key={property._id}
                      onClick={() => onSelectProperty(property._id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                          <div style={{
                            width: 36,
                            height: 36,
                            borderRadius: 6,
                            backgroundColor: 'var(--slate-100)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 18
                          }}>
                            🏠
                          </div>
                          <View>
                            <Text style={{ fontWeight: '500', color: 'var(--slate-900)', fontSize: 14 }}>
                              {property.address.line1}
                            </Text>
                            <Text style={{ color: 'var(--slate-500)', fontSize: 13 }}>
                              {property.address.city}, {property.address.postcode}
                            </Text>
                          </View>
                        </View>
                      </td>
                      <td>
                        <Text style={{ color: 'var(--slate-600)', fontSize: 14, textTransform: 'capitalize' }}>
                          {property.propertyType} • {property.bedrooms} Beds
                        </Text>
                      </td>
                      <td>
                        <span className={`badge badge-${statusConfig.badge}`}>
                          {statusConfig.label}
                        </span>
                      </td>
                      <td>
                        <Text style={{ fontSize: 13, color: 'var(--slate-600)' }}>
                          {property.availabilityStatus?.replace(/_/g, ' ') || '-'}
                        </Text>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
                          <Button
                            title="Delete"
                            size="sm"
                            variant="destructive"
                            onPress={(e: any) => {
                              e.stopPropagation();
                              deleteProperty(property._id);
                            }}
                          />
                          <Button
                            title="View"
                            size="sm"
                            variant="ghost"
                            onPress={(e: any) => {
                              e.stopPropagation();
                              onSelectProperty(property._id);
                            }}
                          />
                        </View>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {toast.visible && (
        <View style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 100 }}>
          <Toast
            toast={{ id: '1', message: toast.message, type: toast.type }}
            onDismiss={() => setToast({ ...toast, visible: false })}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
  },
  filterBar: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 16,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    maxWidth: 400,
  },
  filterGroup: {
    flexDirection: 'row',
    gap: 12,
  },
});

export default React.memo(PropertiesScreen);
