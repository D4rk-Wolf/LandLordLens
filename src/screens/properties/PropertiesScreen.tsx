/**
 * PROPERTIES SCREEN
 * Displays a list of all properties with advanced filtering and sorting.
 * 
 * Key Features:
 * - Fetches data using `useProperties` (custom React Query hook).
 * - Client-side filtering by Search Query and Status.
 * - Client-side sorting by Date.
 * - Enforces Subscription Limits (e.g. Free tier max 1 property).
 */

import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import Toast from '../../components/ui/Toast';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';
import PageHeader from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { useProperties } from '../../hooks/queries/useProperties';
import { Property } from '../../types/models';

const PropertiesScreen: React.FC = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  // Using custom hook for data fetching (Separation of Concerns)
  const { data: properties = [], isLoading: loading, refetch } = useProperties();

  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
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

  // Effect to handle filtering and sorting locally
  React.useEffect(() => {
    let result = [...properties];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.address.line1.toLowerCase().includes(query) ||
          p.address.city.toLowerCase().includes(query) ||
          p.address.postcode.toLowerCase().includes(query) ||
          (p.propertyType && p.propertyType.toLowerCase().includes(query))
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((p) => p.status === statusFilter);
    }

    result.sort((a, b) => {
      // Ensure date exists, fallback to 0 if missing for safe sort
      const dateA = a._id ? new Date(parseInt(a._id.substring(0, 8), 16) * 1000).getTime() : 0;
      const dateB = b._id ? new Date(parseInt(b._id.substring(0, 8), 16) * 1000).getTime() : 0;
      // Using _id timestamp as valid fallback if createdAt is missing in interface but present in objectId

      switch (sortBy) {
        case 'date-desc':
          return dateB - dateA;
        case 'date-asc':
          return dateA - dateB;
        default:
          return 0;
      }
    });

    setFilteredProperties(result);
  }, [properties, searchQuery, statusFilter, sortBy]);

  const deleteProperty = useCallback(async (id: string) => {
    if (window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      try {
        await apiClient.delete(`/properties/${id}`, token || undefined);
        showToast('Property deleted successfully', 'success');
        refetch(); // Refetch after delete
      } catch (error) {
        logger.error('Error deleting property', error);
        showToast('Failed to delete property', 'error');
      }
    }
  }, [token, refetch]);

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
                navigate('/properties/new');
              };

              // Feature Verification: Free Tier Limit
              // Free tier is limited to 1 property.
              const isFreeTier = !user?.subscription || user.subscription === 'free';
              if (isFreeTier && properties.length >= 1) {
                // Using window.alert for web compatibility or a Toast
                // If Alert.alert is not reliably implemented for web in this env
                if (window.confirm('Free tier users are limited to 1 property. Upgrade to Pro for unlimited properties.\n\nGo to Settings to view plans?')) {
                  // In a real app, navigate to pricing/settings
                  navigate('/pricing');
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
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
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
                    <td colSpan={5} style={{ padding: 0 }}>
                      <EmptyState
                        icon="🏠"
                        title="No Properties Found"
                        description={searchQuery ? "No properties match your search criteria." : "You haven't added any properties yet."}
                        actionLabel={searchQuery ? "Clear Filters" : "Add Property"}
                        onAction={searchQuery ? () => { setSearchQuery(''); setStatusFilter('all'); } : () => navigate('/properties/new')}
                        style={{ border: 'none', boxShadow: 'none' }}
                      />
                    </td>
                  </tr>
                ) : (
                  filteredProperties.map((property) => {
                    const statusConfig = getStatusConfig(property.status);
                    return (
                      <tr
                        key={property._id}
                        onClick={() => navigate(`/properties/${property._id}`)}
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
                                navigate(`/properties/${property._id}`);
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
        </Card>
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
