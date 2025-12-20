import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { COMPLIANCE_EXPIRY_DAYS } from '../../utils/constants';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';

interface DashboardScreenProps {
  onNavigate: (screen: string) => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeTenancies: 0,
    pendingMaintenance: 0,
    expiringCompliance: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const fetchDashboardData = useCallback(async () => {
    if (!token) return;

    try {
      // Fetch properties with caching
      const propertiesData = await apiClient.get<{ properties: any[] }>(
        '/properties',
        token,
        { cache: true, cacheTTL: 2 * 60 * 1000 } // 2 minute cache
      );
      const properties = propertiesData.properties || [];
      
      if (properties.length === 0) {
        setStats({
          totalProperties: 0,
          activeTenancies: 0,
          pendingMaintenance: 0,
          expiringCompliance: 0,
        });
        setLoading(false);
        return;
      }

      const now = new Date();
      const expiryThreshold = new Date(now.getTime() + COMPLIANCE_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
      
      // Fetch all property details in parallel for better performance
      const propertyDetailRequests = properties.map((property) =>
        () => apiClient.get<any>(`/properties/${property._id}`, token, {
          cache: true,
          cacheTTL: 2 * 60 * 1000,
        }).catch((error) => {
          logger.debug(`Failed to fetch details for property ${property._id}`, error);
          return null;
        })
      );

      const propertyDetails = await apiClient.parallel(propertyDetailRequests);
      
      // Calculate stats from property details
      let activeTenancies = 0;
      let expiringCompliance = 0;
      
      propertyDetails.forEach((propertyDetail) => {
        if (!propertyDetail) return;
        
        // Count active tenancies
        activeTenancies += (propertyDetail.tenancies || []).filter(
          (t: any) => t.status === 'active'
        ).length;
        
        // Count expiring compliance records
        expiringCompliance += (propertyDetail.complianceRecords || []).filter(
          (r: any) => {
            if (!r.expiryDate) return false;
            try {
              const expiry = new Date(r.expiryDate);
              return expiry >= now && expiry <= expiryThreshold;
            } catch {
              return false;
            }
          }
        ).length;
      });
      
      setStats({
        totalProperties: properties.length,
        activeTenancies,
        pendingMaintenance: 0,
        expiringCompliance,
      });
    } catch (error) {
      logger.error('Error fetching dashboard data', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const statCards = useMemo(() => [
    {
      label: 'Total Properties',
      value: stats.totalProperties,
      icon: '🏠',
      color: '#6366f1',
      gradient: ['#6366f1', '#8b5cf6'],
      action: () => onNavigate('properties'),
    },
    {
      label: 'Active Tenancies',
      value: stats.activeTenancies,
      icon: '👥',
      color: '#10b981',
      gradient: ['#10b981', '#059669'],
      action: () => onNavigate('properties'),
    },
    {
      label: 'Pending Maintenance',
      value: stats.pendingMaintenance,
      icon: '🔧',
      color: '#f59e0b',
      gradient: ['#f59e0b', '#d97706'],
      action: () => onNavigate('maintenance'),
    },
    {
      label: 'Expiring Compliance',
      value: stats.expiringCompliance,
      icon: '📋',
      color: '#ef4444',
      gradient: ['#ef4444', '#dc2626'],
      action: () => onNavigate('compliance'),
    },
  ], [stats, onNavigate]);

  const quickActions = useMemo(() => [
    {
      label: 'Add New Property',
      icon: '➕',
      description: 'Register a new property',
      color: '#6366f1',
      action: () => onNavigate('new-property'),
    },
    {
      label: 'Create Maintenance Ticket',
      icon: '🔧',
      description: 'Report a maintenance issue',
      color: '#f59e0b',
      action: () => onNavigate('new-maintenance'),
    },
    {
      label: 'View Properties',
      icon: '🏠',
      description: 'Manage your properties',
      color: '#10b981',
      action: () => onNavigate('properties'),
    },
    {
      label: 'Compliance Tracking',
      icon: '📋',
      description: 'Check compliance status',
      color: '#8b5cf6',
      action: () => onNavigate('compliance'),
    },
  ], [onNavigate]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>Welcome back! 👋</Text>
              <View style={styles.greetingLine} />
            </View>
          </View>
          <Text style={styles.title}>Dashboard Overview</Text>
          <Text style={styles.subtitle}>Here's what's happening with your properties today</Text>
        </View>
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.statsContainer}>
          {statCards.map((stat, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.statCard, 
                { 
                  borderLeftColor: stat.color,
                  borderLeftWidth: 5,
                }
              ]}
              onPress={stat.action}
              activeOpacity={0.85}
            >
              <View style={styles.statCardHeader}>
                <View style={[
                  styles.statIconContainer, 
                  { 
                    backgroundColor: `${stat.color}15`,
                  }
                ]}>
                  <Text style={styles.statIcon}>{stat.icon}</Text>
                </View>
                {stat.value > 0 && (
                  <View style={[
                    styles.statBadge, 
                    { 
                      backgroundColor: stat.color,
                    }
                  ]}>
                    <Text style={styles.statBadgeText}>{stat.value}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.statNumber}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <View style={styles.statFooter}>
                <View style={[styles.statLinkContainer, { backgroundColor: `${stat.color}10` }]}>
                  <Text style={[styles.statLink, { color: stat.color }]}>
                    View Details
                  </Text>
                  <Text style={[styles.statArrow, { color: stat.color }]}>→</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickActionsSection}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <Text style={styles.sectionSubtitle}>Common tasks at your fingertips</Text>
            </View>
          </View>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.actionCard, 
                  { 
                    borderColor: `${action.color}25`,
                    borderWidth: 1.5,
                  }
                ]}
                onPress={action.action}
                activeOpacity={0.75}
              >
                <View style={[
                  styles.actionIconContainer, 
                  { 
                    backgroundColor: `${action.color}15`,
                  }
                ]}>
                  <Text style={styles.actionIcon}>{action.icon}</Text>
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
                <View style={[
                  styles.actionArrow, 
                  { 
                    backgroundColor: `${action.color}20`,
                  }
                ]}>
                  <Text style={[styles.actionArrowText, { color: action.color }]}>→</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.insightsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Insights & Tips</Text>
            <Text style={styles.sectionSubtitle}>Stay ahead with actionable advice</Text>
          </View>
          <View style={styles.insightsGrid}>
            <TouchableOpacity 
              style={styles.insightCard}
              onPress={() => onNavigate('compliance')}
              activeOpacity={0.8}
            >
              <View style={styles.insightIconContainer}>
                <Text style={styles.insightIcon}>💡</Text>
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Stay Compliant</Text>
                <Text style={styles.insightText}>
                  Regularly check your compliance records to ensure all certificates are up to date.
                </Text>
              </View>
              <View style={styles.insightArrow}>
                <Text style={styles.insightArrowText}>→</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.insightCard}
              onPress={() => onNavigate('expenses')}
              activeOpacity={0.8}
            >
              <View style={styles.insightIconContainer}>
                <Text style={styles.insightIcon}>📊</Text>
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Track Expenses</Text>
                <Text style={styles.insightText}>
                  Keep detailed records of all property expenses for tax reporting and financial planning.
                </Text>
              </View>
              <View style={styles.insightArrow}>
                <Text style={styles.insightArrowText}>→</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.insightCard}
              onPress={() => onNavigate('inspections')}
              activeOpacity={0.8}
            >
              <View style={styles.insightIconContainer}>
                <Text style={styles.insightIcon}>🔍</Text>
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Regular Inspections</Text>
                <Text style={styles.insightText}>
                  Schedule regular property inspections to maintain property condition and tenant satisfaction.
                </Text>
              </View>
              <View style={styles.insightArrow}>
                <Text style={styles.insightArrowText}>→</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    paddingBottom: 40,
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    position: 'relative',
    overflow: 'hidden',
  },
  headerContent: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  headerTop: {
    marginBottom: 16,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  greeting: {
    fontSize: 15,
    color: '#6366f1',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  greetingLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
    maxWidth: 100,
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
    letterSpacing: -1.5,
    lineHeight: 56,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    lineHeight: 28,
    fontWeight: '400',
  },
  contentWrapper: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 32,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 32,
    gap: 20,
    marginBottom: 8,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 20,
    boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.08)',
    elevation: 3,
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  statCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 28,
  },
  statBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    minWidth: 28,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.15)',
    elevation: 2,
  },
  statBadgeText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  statNumber: {
    fontSize: 42,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    letterSpacing: -1,
    lineHeight: 48,
  },
  statLabel: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 16,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  statFooter: {
    marginTop: 4,
  },
  statLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  statLink: {
    fontSize: 13,
    fontWeight: '600',
    marginRight: 8,
    letterSpacing: 0.3,
  },
  statArrow: {
    fontSize: 16,
    fontWeight: '700',
  },
  quickActionsSection: {
    paddingTop: 32,
    paddingBottom: 16,
  },
  sectionHeader: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    letterSpacing: -1,
    lineHeight: 40,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '400',
    lineHeight: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 20,
    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.06)',
    elevation: 2,
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  actionIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionIcon: {
    fontSize: 32,
  },
  actionLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  actionDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    fontWeight: '400',
  },
  actionArrow: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionArrowText: {
    fontSize: 20,
    fontWeight: '700',
  },
  insightsSection: {
    paddingTop: 32,
    paddingBottom: 40,
  },
  insightsGrid: {
    gap: 20,
  },
  insightCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    gap: 20,
    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.05)',
    elevation: 1,
  },
  insightIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  insightIcon: {
    fontSize: 28,
  },
  insightContent: {
    flex: 1,
    paddingTop: 4,
  },
  insightTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  insightText: {
    fontSize: 15,
    color: '#6b7280',
    lineHeight: 24,
    fontWeight: '400',
  },
  insightArrow: {
    alignSelf: 'flex-start',
    marginTop: 4,
    paddingLeft: 12,
  },
  insightArrowText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6366f1',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    minHeight: 400,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
});

export default DashboardScreen;
