import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Skeleton } from '../../components/ui/Skeleton';
import { PieChart, BarChart } from '../../components/ui/Charts';
import { DocumentModal } from '../../components/ui/DocumentModal';
import PropertyMapView from '../../components/maps/PropertyMapView';
import { useAuth } from '../../contexts/AuthContext';
import { COMPLIANCE_EXPIRY_DAYS } from '../../utils/constants';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';
import PageHeader from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';

interface DashboardScreenProps {
  onNavigate: (screen: string) => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  const { token, user } = useAuth();
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

  const fetchDashboardData = useCallback(async () => {
    if (!token) return;

    try {
      const propertiesData = await apiClient.get<{ properties: any[] }>(
        '/properties',
        token || undefined,
        { cache: true, cacheTTL: 2 * 60 * 1000 }
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

      const propertyDetailRequests = properties.map((property) =>
        () => apiClient.get<any>(`/properties/${property._id}`, token || undefined, {
          cache: true,
          cacheTTL: 2 * 60 * 1000,
        }).catch((error) => {
          return null;
        })
      );

      const propertyDetails = await apiClient.parallel(propertyDetailRequests);

      let activeTenancies = 0;
      let expiringCompliance = 0;
      let pendingMaintenance = 0;

      propertyDetails.forEach((propertyDetail) => {
        if (!propertyDetail) return;
        activeTenancies += (propertyDetail.tenancies || []).filter(
          (t: any) => t.status === 'active'
        ).length;
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
        pendingMaintenance,
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
      icon: '🏢',
      color: 'var(--primary-600)',
      bg: 'var(--primary-50)',
      action: () => onNavigate('properties'),
    },
    {
      label: 'Active Tenancies',
      value: stats.activeTenancies,
      icon: '👥',
      color: 'var(--success-text)',
      bg: 'var(--success-bg)',
      action: () => onNavigate('properties'),
    },
    {
      label: 'Maintenance',
      value: stats.pendingMaintenance,
      icon: '🔧',
      color: 'var(--warning-text)',
      bg: 'var(--warning-bg)',
      action: () => onNavigate('maintenance'),
    },
    {
      label: 'Compliance Alert',
      value: stats.expiringCompliance,
      icon: '⚠️',
      color: 'var(--danger-text)',
      bg: 'var(--danger-bg)',
      action: () => onNavigate('compliance'),
    },
  ], [stats, onNavigate]);

  const quickActions = useMemo(() => [
    {
      label: 'Add Property',
      icon: '🏠',
      description: 'Register a new unit',
      action: () => onNavigate('new-property'),
    },
    {
      label: 'Log Expense',
      icon: '💸',
      description: 'Track outgoing costs',
      action: () => onNavigate('expenses'),
    },
    {
      label: 'New Inspection',
      icon: '📋',
      description: 'Schedule a check',
      action: () => onNavigate('inspections'),
    },
    {
      label: 'Report Issue',
      icon: '🔧',
      description: 'Maintenance request',
      action: () => onNavigate('new-maintenance'),
    },
  ], [onNavigate]);

  if (loading) {
    return (
      <View style={styles.container}>
        <PageHeader title="Dashboard" />
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.welcomeSection}>
            <Skeleton width={180} height={24} style={{ marginBottom: 16 }} />
            <Skeleton width={400} height={40} />
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Dashboard"
        rightAction={
          <Button
            title="Customize"
            variant="secondary"
            size="sm"
            onPress={() => setIsCustomizeVisible(true)}
            icon="⚙️"
          />
        }
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
          <View style={styles.welcomeSection}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={styles.greeting}>Overview</Text>
                <Text style={styles.subtitle}>Welcome back, {user?.name || 'Landlord'}</Text>
              </View>
              {stats.totalProperties === 0 && (
                <View>
                  <Button
                    title="Load Sample Data"
                    onPress={async () => {
                      try {
                        setLoading(true);
                        await apiClient.post('/seed/data', {}, token || undefined);
                        window.location.reload();
                      } catch (error) {
                        logger.error('Failed to seed data', error);
                        alert('Failed to load sample data');
                        setLoading(false);
                      }
                    }}
                    icon="🚀"
                  />
                </View>
              )}
            </View>
          </View>
        </div>

        <View style={styles.contentWrapper}>
          {visibleWidgets.stats && (
            <div style={{ animation: 'fadeIn 0.5s ease 0.1s backwards' }}>
              <View style={styles.statsContainer}>
                {statCards.map((card, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.statCard, {
                      backgroundColor: 'var(--bg-surface)',
                      borderRadius: 12,
                      padding: 20,
                      borderWidth: 1,
                      borderColor: 'var(--border-subtle)',
                      boxShadow: 'var(--shadow-sm)',
                    } as any]}
                    onPress={card.action}
                    activeOpacity={0.8}
                  >
                    <View style={styles.statCardHeader}>
                      <View style={[styles.statIconContainer, { backgroundColor: card.bg }]}>
                        <Text style={[styles.statIcon, { color: card.color }]}>{card.icon}</Text>
                      </View>
                    </View>
                    <Text style={styles.statNumber}>{card.value}</Text>
                    <Text style={styles.statLabel}>{card.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </div>
          )}

          <div style={{ display: 'flex', gap: 24, flexDirection: 'row', flexWrap: 'wrap', animation: 'fadeIn 0.5s ease 0.2s backwards' }}>
            {visibleWidgets.analytics && (
              <View style={{ flex: 2, minWidth: 350, gap: 24 }}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Performance</Text>
                </View>
                <div className="saas-card" style={styles.chartContainer as any}>
                  <View style={styles.portfolioSummaryContainer}>
                    <View style={styles.portfolioHealthSection}>
                      <View style={styles.healthRingContainer}>
                        {/* Simple CSS-based circular progress simulation */}
                        <View style={[styles.healthRing, {
                          // @ts-ignore
                          background: `conic-gradient(var(--primary-500) ${Math.round((stats.activeTenancies / (stats.totalProperties || 1)) * 360)}deg, var(--slate-200) 0deg)`
                        }]}>
                          <View style={styles.healthRingInner}>
                            <Text style={styles.healthPercentage}>
                              {stats.totalProperties > 0 ? Math.round((stats.activeTenancies / stats.totalProperties) * 100) : 0}%
                            </Text>
                            <Text style={styles.healthLabel}>Occupancy</Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.healthTextContainer}>
                        <Text style={styles.healthTitle}>Portfolio Health</Text>
                        <Text style={styles.healthSubtitle}>
                          {stats.pendingMaintenance === 0 && stats.expiringCompliance === 0
                            ? 'Everything is running smoothly.'
                            : `${stats.pendingMaintenance} issues require attention.`}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.portfolioStatsGrid}>
                      <View style={styles.portfolioStatItem}>
                        <View style={[styles.pStatIcon, { backgroundColor: 'var(--primary-50)' }]}>
                          <Text style={{ fontSize: 18 }}>🏠</Text>
                        </View>
                        <View>
                          <Text style={styles.pStatLabel}>Total Units</Text>
                          <Text style={styles.pStatValue}>{stats.totalProperties}</Text>
                        </View>
                      </View>
                      <View style={styles.portfolioStatItem}>
                        <View style={[styles.pStatIcon, { backgroundColor: 'var(--success-bg)' }]}>
                          <Text style={{ fontSize: 18 }}>👥</Text>
                        </View>
                        <View>
                          <Text style={styles.pStatLabel}>Occupied</Text>
                          <Text style={[styles.pStatValue, { color: 'var(--success-text)' }]}>{stats.activeTenancies}</Text>
                        </View>
                      </View>
                      <View style={styles.portfolioStatItem}>
                        <View style={[styles.pStatIcon, { backgroundColor: 'var(--warning-bg)' }]}>
                          <Text style={{ fontSize: 18 }}>🔧</Text>
                        </View>
                        <View>
                          <Text style={styles.pStatLabel}>Maintenance</Text>
                          <Text style={[styles.pStatValue, { color: 'var(--warning-text)' }]}>{stats.pendingMaintenance}</Text>
                        </View>
                      </View>
                      <View style={styles.portfolioStatItem}>
                        <View style={[styles.pStatIcon, { backgroundColor: 'var(--danger-bg)' }]}>
                          <Text style={{ fontSize: 18 }}>⚠️</Text>
                        </View>
                        <View>
                          <Text style={styles.pStatLabel}>Compliance</Text>
                          <Text style={[styles.pStatValue, { color: 'var(--danger-text)' }]}>{stats.expiringCompliance}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </div>
              </View>
            )}

            {visibleWidgets.quickActions && (
              <View style={{ flex: 1, minWidth: 300, gap: 24 }}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Quick Actions</Text>
                </View>
                <View style={styles.quickActionsGrid}>
                  {quickActions.map((action, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.actionCard, {
                        backgroundColor: 'var(--bg-surface)',
                        borderRadius: 12,
                        padding: 16,
                        borderWidth: 1,
                        borderColor: 'var(--border-subtle)',
                        boxShadow: 'var(--shadow-sm)',
                      } as any]}
                      onPress={action.action}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.actionIcon, { fontSize: 24, marginBottom: 8 }]}>{action.icon}</Text>
                      <View>
                        <Text style={styles.actionLabel}>{action.label}</Text>
                        <Text style={styles.actionDescription}>{action.description}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </div>
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
        documentName="Customize View"
        documentType="Settings"
      >
        <View style={styles.customizeModalContent}>
          <Text style={styles.customizeModalTitle}>Dashboard Layout</Text>
          <Text style={styles.customizeModalSubtitle}>Select which sections to display.</Text>
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
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 60,
    paddingHorizontal: 0,
    maxWidth: 1600,
    width: '100%',
    alignSelf: 'center',
  },
  welcomeSection: {
    marginTop: 24,
    marginBottom: 32,
  },
  greeting: {
    fontSize: 14,
    color: 'var(--text-muted)',
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: '700',
    color: 'var(--text-main)',
    fontFamily: 'var(--font-display)',
    letterSpacing: -0.5,
  },
  contentWrapper: {
    gap: 32,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  statCard: {
    flex: 1,
    minWidth: 200,
    // saas-card class handles padding, bg, shadows
  },
  statCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 20,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: '700',
    color: 'var(--text-main)',
    marginBottom: 4,
    letterSpacing: -1,
    fontFamily: 'var(--font-display)',
  },
  statLabel: {
    fontSize: 14,
    color: 'var(--text-muted)',
    fontWeight: '500',
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'var(--text-main)',
  },
  chartContainer: {
    // saas-card
  },
  quickActionsGrid: {
    gap: 16,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },
  actionIcon: {
    color: 'var(--slate-500)',
  },
  actionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: 'var(--text-main)',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 13,
    color: 'var(--text-muted)',
  },
  customizeModalContent: {
    padding: 24,
  },
  customizeModalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'var(--slate-900)',
    marginBottom: 8,
    fontFamily: 'var(--font-display)',
  },
  customizeModalSubtitle: {
    fontSize: 14,
    color: 'var(--slate-500)',
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
    backgroundColor: 'var(--slate-50)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'var(--slate-200)',
  },
  customizeItemLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: 'var(--slate-700)',
  },
  toggleSwitch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'var(--slate-300)',
    padding: 2,
    justifyContent: 'center',
  },
  toggleSwitchActive: {
    backgroundColor: 'var(--primary-500)',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'var(--bg-surface)',
    transform: [{ translateX: 0 }],
    transition: 'transform 0.2s',
  } as any,
  toggleThumbActive: {
    transform: [{ translateX: 20 }],
  },
  portfolioSummaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
    flexWrap: 'wrap',
  },
  portfolioHealthSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    flex: 1,
    minWidth: 200,
  },
  healthRingContainer: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  healthRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  healthRingInner: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: 'var(--bg-surface)',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
  },
  healthPercentage: {
    fontSize: 20,
    fontWeight: '800',
    color: 'var(--text-main)',
  },
  healthLabel: {
    fontSize: 11,
    color: 'var(--text-muted)',
    fontWeight: '600',
    marginTop: -2,
    textTransform: 'uppercase',
  },
  healthTextContainer: {
    flex: 1,
    minWidth: 120,
  },
  healthTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'var(--text-main)',
    marginBottom: 4,
  },
  healthSubtitle: {
    fontSize: 13,
    color: 'var(--text-muted)',
    lineHeight: 18,
  },
  portfolioStatsGrid: {
    flex: 1.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    minWidth: 280,
  },
  portfolioStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    gap: 12,
  },
  pStatIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pStatLabel: {
    fontSize: 12,
    color: 'var(--text-muted)',
    fontWeight: '500',
  },
  pStatValue: {
    fontSize: 16,
    fontWeight: '700',
    color: 'var(--text-main)',
  },
});

export default DashboardScreen;
