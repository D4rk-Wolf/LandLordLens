import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Skeleton } from '../../components/ui/Skeleton';
import { PieChart, BarChart } from '../../components/ui/Charts';
import { DocumentModal } from '../../components/ui/DocumentModal';
import PropertyMapView from '../../components/maps/PropertyMapView';
import { useAuth } from '../../contexts/AuthContext';
import { COMPLIANCE_EXPIRY_DAYS } from '../../utils/constants';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';
import PageHeader from '../../components/ui/PageHeader';

interface DashboardScreenProps {
  onNavigate: (screen: string) => void;
  onSignOut: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate, onSignOut }) => {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeTenancies: 0,
    pendingMaintenance: 0,
    expiringCompliance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [previewDoc, setPreviewDoc] = useState({ name: '', type: '' });
  const [isCustomizeVisible, setIsCustomizeVisible] = useState(false);
  const [visibleWidgets, setVisibleWidgets] = useState({
    stats: true,
    analytics: true,
    quickActions: true,
    insights: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem('dashboard_widgets');
    if (saved) {
      try {
        setVisibleWidgets(JSON.parse(saved));
      } catch (e) {
        logger.error('Failed to parse dashboard widgets', e);
      }
    }
  }, []);

  const toggleWidget = (key: keyof typeof visibleWidgets) => {
    const updated = { ...visibleWidgets, [key]: !visibleWidgets[key] };
    setVisibleWidgets(updated);
    localStorage.setItem('dashboard_widgets', JSON.stringify(updated));
  };

  // useEffect moved below fetchDashboardData definition to fix hoisting issue

  const fetchDashboardData = useCallback(async () => {
    if (!token) return;

    try {
      // Fetch properties with caching
      const propertiesData = await apiClient.get<{ properties: any[] }>(
        '/properties',
        token || undefined,
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
        () => apiClient.get<any>(`/properties/${property._id}`, token || undefined, {
          cache: true,
          cacheTTL: 2 * 60 * 1000,
        }).catch((error) => {
          logger.debug(`Failed to fetch details for property ${property._id}: ${error}`);
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

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const statCards = useMemo(() => [
    {
      label: 'Total Properties',
      value: stats.totalProperties,
      icon: '🏠',
      color: 'var(--primary)',
      gradient: 'var(--primary-gradient)',
      action: () => onNavigate('properties'),
    },
    {
      label: 'Active Tenancies',
      value: stats.activeTenancies,
      icon: '👥',
      color: 'var(--success)',
      gradient: 'var(--success-gradient)',
      action: () => onNavigate('properties'),
    },
    {
      label: 'Pending Maintenance',
      value: stats.pendingMaintenance,
      icon: '🔧',
      color: 'var(--warning)',
      gradient: 'var(--warning-gradient)',
      action: () => onNavigate('maintenance'),
    },
    {
      label: 'Expiring Compliance',
      value: stats.expiringCompliance,
      icon: '📋',
      color: 'var(--danger)',
      gradient: 'var(--danger-gradient)',
      action: () => onNavigate('compliance'),
    },
  ], [stats, onNavigate]);

  const quickActions = useMemo(() => [
    {
      label: 'Add Property',
      icon: '➕',
      description: 'Register a new unit',
      color: 'var(--primary)',
      action: () => onNavigate('new-property'),
    },
    {
      label: 'Maintenance',
      icon: '🔧',
      description: 'Report an issue',
      color: 'var(--warning)',
      action: () => onNavigate('new-maintenance'),
    },
    {
      label: 'Insights',
      icon: '📊',
      description: 'View performance',
      color: 'var(--success)',
      action: () => onNavigate('properties'),
    },
    {
      label: 'Compliance',
      icon: '🛡️',
      description: 'Check status',
      color: 'var(--secondary)',
      action: () => onNavigate('compliance'),
    },
  ], [onNavigate]);

  if (loading) {
    return (
      <View style={styles.container}>
        <PageHeader title="Dashboard" onSignOut={onSignOut} />
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.welcomeSection}>
            <Skeleton width={180} height={24} style={{ marginBottom: 16 }} />
            <Skeleton width={400} height={40} />
          </View>
          <View style={styles.contentWrapper}>
            <View style={styles.statsContainer}>
              {[1, 2, 3, 4].map((i) => (
                <View key={i} style={[styles.statCard, { minWidth: 260 }]}>
                  <Skeleton width={64} height={64} borderRadius={20} style={{ marginBottom: 24 }} />
                  <Skeleton width={100} height={48} style={{ marginBottom: 12 }} />
                  <Skeleton width={150} height={20} />
                </View>
              ))}
            </View>
            <View style={styles.quickActionsSection}>
              <Skeleton width={200} height={28} style={{ marginBottom: 12 }} />
              <View style={styles.quickActionsGrid}>
                {[1, 2, 3, 4].map((i) => (
                  <View key={i} style={[styles.actionCard, { minWidth: 200 }]}>
                    <Skeleton width={48} height={48} borderRadius={14} style={{ marginBottom: 16 }} />
                    <Skeleton width={120} height={20} style={{ marginBottom: 8 }} />
                    <Skeleton width={160} height={16} />
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Dashboard"
        onSignOut={onSignOut}
        rightAction={
          <TouchableOpacity
            style={styles.customizeButton}
            onPress={() => setIsCustomizeVisible(true)}
          >
            <Text style={styles.customizeButtonText}>⚙️ Customize</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>WELCOME BACK! 👋</Text>
          <Text style={styles.subtitle}>Here's what's happening with your properties today</Text>
        </View>

        <View style={styles.contentWrapper}>
          {visibleWidgets.stats && (
            <View style={styles.statsContainer}>
              {statCards.map((card, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.statCard, { borderLeftColor: card.color, borderLeftWidth: 5 }]}
                  onPress={card.action}
                  activeOpacity={0.8}
                >
                  <View style={styles.statCardHeader}>
                    <View style={[styles.statIconContainer, { backgroundColor: `${card.color}15` }]}>
                      <Text style={styles.statIcon}>{card.icon}</Text>
                    </View>
                    <View style={styles.statBadge}>
                      <Text style={styles.statBadgeText}>{card.value}</Text>
                    </View>
                  </View>
                  <Text style={styles.statNumber}>{card.value}</Text>
                  <Text style={styles.statLabel}>{card.label}</Text>
                  <View style={styles.statFooter}>
                    <Text style={[styles.statLink, { color: card.color }]}>View Details</Text>
                    <Text style={[styles.statArrow, { color: card.color }]}>→</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {visibleWidgets.analytics && (
            <View style={styles.analyticsSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Portfolio Analytics</Text>
                <Text style={styles.sectionSubtitle}>Visual breakdown of your assets and compliance</Text>
              </View>
              <View style={styles.chartsGrid}>
                <PieChart
                  title="Property Occupancy"
                  data={[
                    { label: 'Occupied', value: stats.activeTenancies, color: 'var(--primary)' },
                    { label: 'Vacant', value: Math.max(0, stats.totalProperties - stats.activeTenancies), color: 'var(--gray-300)' },
                  ]}
                />
                <BarChart
                  title="Status Overview"
                  data={[
                    { label: 'Properties', value: stats.totalProperties, color: 'var(--primary)' },
                    { label: 'Active', value: stats.activeTenancies, color: 'var(--success)' },
                    { label: 'Maintenance', value: stats.pendingMaintenance, color: 'var(--warning)' },
                    { label: 'Compliance', value: stats.expiringCompliance, color: 'var(--danger)' },
                  ]}
                />
              </View>
            </View>
          )}

          {visibleWidgets.quickActions && (
            <View style={styles.quickActionsSection}>
              <View style={styles.quickActionsGrid}>
                {quickActions.map((action, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.actionCard, { borderColor: `${action.color}25`, borderWidth: 1.5 }]}
                    onPress={action.action}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.actionIconContainer, { backgroundColor: `${action.color}15` }]}>
                      <Text style={styles.actionIcon}>{action.icon}</Text>
                    </View>
                    <Text style={styles.actionLabel}>{action.label}</Text>
                    <Text style={styles.actionDescription}>{action.description}</Text>
                    <View style={styles.actionArrow}>
                      <Text style={{ color: action.color, fontWeight: '700', fontSize: 18 }}>→</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {visibleWidgets.insights && (
            <View style={styles.insightsSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Insights & Tips</Text>
                <Text style={styles.sectionSubtitle}>Stay ahead with actionable advice</Text>
              </View>
              <View style={styles.insightsGrid}>
                <TouchableOpacity
                  style={styles.insightCard}
                  onPress={() => {
                    setPreviewDoc({ name: 'Compliance_Report_2024.pdf', type: 'PDF' });
                    setIsPreviewVisible(true);
                  }}
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
              </View>
            </View>
          )}

          {/* Map View Section */}
          <View style={styles.mapSection}>
            <PropertyMapView />
          </View>
        </View>
      </ScrollView>

      <DocumentModal
        isVisible={isPreviewVisible}
        onClose={() => setIsPreviewVisible(false)}
        documentName={previewDoc.name}
        documentType={previewDoc.type}
      />

      <DocumentModal
        isVisible={isCustomizeVisible}
        onClose={() => setIsCustomizeVisible(false)}
        documentName="Customize Dashboard"
        documentType="Settings"
      >
        <View style={styles.customizeModalContent}>
          <Text style={styles.customizeModalTitle}>Active Widgets</Text>
          <Text style={styles.customizeModalSubtitle}>Toggle sections to customize your dashboard layout.</Text>
          <View style={styles.customizeList}>
            {(Object.keys(visibleWidgets) as Array<keyof typeof visibleWidgets>).map((key) => (
              <TouchableOpacity
                key={key}
                style={styles.customizeItem}
                onPress={() => toggleWidget(key)}
              >
                <Text style={styles.customizeItemLabel}>
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                </Text>
                <View style={[styles.toggleSwitch, visibleWidgets[key] && styles.toggleSwitchActive]}>
                  <View style={[styles.toggleThumb, visibleWidgets[key] && styles.toggleThumbActive]} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </DocumentModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 32,
    maxWidth: 1440,
    width: '100%',
    alignSelf: 'center',
  },
  welcomeSection: {
    marginTop: 40,
    marginBottom: 48,
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
    fontSize: 16,
    color: 'var(--primary)',
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 8,
    textTransform: 'uppercase',
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
    fontSize: 32,
    fontWeight: '800',
    color: 'var(--text-primary)',
    letterSpacing: -1,
    lineHeight: 40,
  },
  contentWrapper: {
    gap: 48,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  statCard: {
    flex: 1,
    minWidth: 260,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    //@ts-ignore
    backdropFilter: 'blur(16px)',
    padding: 32,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    //@ts-ignore
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
  },
  statCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  statIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
  statIcon: {
    fontSize: 32,
  },
  statBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  statBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'var(--text-secondary)',
  },
  statNumber: {
    fontSize: 48,
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: 4,
    letterSpacing: -1.5,
  },
  statLabel: {
    fontSize: 16,
    color: 'var(--text-secondary)',
    fontWeight: '500',
    marginBottom: 24,
  },
  statFooter: {
    marginTop: 'auto',
  },
  statLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statLink: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  statArrow: {
    fontSize: 18,
    fontWeight: '700',
  },
  quickActionsSection: {
    gap: 24,
  },
  sectionHeader: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: 'var(--text-primary)',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: 'var(--text-secondary)',
    fontWeight: '400',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  actionCard: {
    flex: 1,
    minWidth: 200,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    //@ts-ignore
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 13,
    color: 'var(--text-secondary)',
    lineHeight: 18,
  },
  actionArrow: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    transition: 'all 0.2s ease',
  },
  insightsSection: {
    gap: 24,
  },
  insightsGrid: {
    gap: 16,
  },
  insightCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: 24,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    //@ts-ignore
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
  },
  insightIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.03)',
  },
  insightIcon: {
    fontSize: 24,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: 4,
  },
  insightText: {
    fontSize: 14,
    color: 'var(--text-secondary)',
    lineHeight: 20,
  },
  insightArrow: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightArrowText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'var(--primary)',
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
    fontSize: 15,
    color: 'var(--text-secondary)',
    fontWeight: '500',
  },
  analyticsSection: {
    gap: 24,
  },
  chartsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  customizeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
  },
  customizeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  customizeModalContent: {
    padding: 24,
  },
  customizeModalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: 8,
  },
  customizeModalSubtitle: {
    fontSize: 14,
    color: 'var(--text-secondary)',
    marginBottom: 24,
  },
  customizeList: {
    gap: 12,
  },
  customizeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: 12,
  },
  customizeItemLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  toggleSwitch: {
    width: 48,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'var(--gray-200)',
    padding: 2,
    justifyContent: 'center',
  },
  toggleSwitchActive: {
    backgroundColor: 'var(--primary)',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    //@ts-ignore
    transition: 'all 0.2s ease',
  },
  toggleThumbActive: {
    transform: [{ translateX: 24 }],
  },
  mapSection: {
    marginTop: 24,
  },
});

export default DashboardScreen;
