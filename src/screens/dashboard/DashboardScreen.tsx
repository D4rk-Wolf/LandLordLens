/**
 * DASHBOARD SCREEN
 * The main landing page for authenticated users.
 * Features:
 * - KPI Statistics (Total Properties, Occupancy, etc.) using `stats` state.
 * - Interactive Charts (using `recharts` wrapper components).
 * - "Quick Actions" for common tasks.
 * - Customizable Widget Layout (persisted to localStorage).
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '../../components/ui/Skeleton';
import { PieChart, BarChart } from '../../components/ui/Charts';
import { DocumentModal } from '../../components/ui/DocumentModal';
import { Modal } from '../../components/ui/Modal';
import PropertyMapView from '../../components/maps/PropertyMapView';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';
import PageHeader from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { CountUp } from '../../components/ui/CountUp';

const DashboardScreen: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Dashboard State
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeTenancies: 0,
    pendingMaintenance: 0,
    expiringCompliance: 0,
  });
  const [loading, setLoading] = useState(true);

  // UI State
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [previewDoc, setPreviewDoc] = useState({ name: '', type: '' });
  const [isCustomizeVisible, setIsCustomizeVisible] = useState(false);

  // Widget Visibility State (Persisted)
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
    try {
      const data = await apiClient.get<{ stats: any }>(
        '/analytics/dashboard-stats',
        { cache: true, cacheTTL: 60 * 1000 } // 1 minute cache
      );

      setStats(data.stats);
    } catch (error) {
      logger.error('Error fetching dashboard data', error);
      // Fallback to zeros (or keep previous state) handled by initial state
    } finally {
      setLoading(false);
    }
  }, []);

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
      action: () => navigate('/properties'),
    },
    {
      label: 'Active Tenancies',
      value: stats.activeTenancies,
      icon: '👥',
      color: 'var(--success-text)',
      bg: 'var(--success-bg)',
      action: () => navigate('/properties'),
    },
    {
      label: 'Maintenance',
      value: stats.pendingMaintenance,
      icon: '🔧',
      color: 'var(--warning-text)',
      bg: 'var(--warning-bg)',
      action: () => navigate('/maintenance'),
    },
    {
      label: 'Compliance Alert',
      value: stats.expiringCompliance,
      icon: '⚠️',
      color: 'var(--danger-text)',
      bg: 'var(--danger-bg)',
      action: () => navigate('/compliance'),
    },
  ], [stats, navigate]);

  const quickActions = useMemo(() => [
    {
      label: 'Add Property',
      icon: '🏠',
      description: 'Register a new unit',
      action: () => navigate('/properties/new'),
    },
    {
      label: 'Log Expense',
      icon: '💸',
      description: 'Track outgoing costs',
      action: () => navigate('/expenses'),
    },
    {
      label: 'New Inspection',
      icon: '📋',
      description: 'Schedule a check',
      action: () => navigate('/inspections'),
    },
    {
      label: 'Report Issue',
      icon: '🔧',
      description: 'Maintenance request',
      action: () => navigate('/maintenance/new'),
    },
    {
      label: 'Find Services',
      icon: '🛒',
      description: 'Insurance & Trades',
      action: () => navigate('/services'),
    },
  ], [navigate]);

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
        <View style={styles.contentWrapper}>
          <View style={styles.welcomeSection}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                {/* <Text style={styles.greeting}>Overview</Text> Remove redundant label */}
                <Text style={styles.subtitle}>Welcome back, {user?.name || 'Landlord'}</Text>
              </View>
              {stats.totalProperties === 0 && (
                <View>
                  <Button
                    title="Load Sample Data"
                    onPress={async () => {
                      try {
                        setLoading(true);
                        await apiClient.post('/seed/data', {});
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
        </View>

        <View style={styles.contentWrapper}>
          {visibleWidgets.stats && (
            <View style={styles.statsContainer}>
              {statCards.map((card, index) => (
                <Card
                  key={index}
                  variant="interactive"
                  style={styles.statCard}
                  onPress={card.action}
                >
                  <View style={{ padding: 20 }}>
                    <View style={styles.statCardHeader}>
                      <View style={[styles.statIconContainer, { backgroundColor: card.bg }]}>
                        <Text style={[styles.statIcon, { color: card.color }]}>{card.icon}</Text>
                      </View>
                    </View>
                    <CountUp
                      end={card.value}
                      style={styles.statNumber}
                    />
                    <Text style={styles.statLabel}>{card.label}</Text>
                  </View>
                </Card>
              ))}
            </View>
          )}

          <div style={{ display: 'flex', gap: 24, flexDirection: 'row', flexWrap: 'wrap' }}>
            {visibleWidgets.analytics && (
              <View style={{ flex: 2, minWidth: 350, gap: 24 }}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Performance</Text>
                </View>
                <Card style={styles.chartContainer as any}>
                  <CardContent style={{ padding: 24 }}>
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
                  </CardContent>
                </Card>
              </View>
            )}

            {visibleWidgets.quickActions && (
              <View style={{ flex: 1, minWidth: 300, gap: 24 }}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Quick Actions</Text>
                </View>
                <View style={styles.quickActionsGrid}>
                  {quickActions.map((action, index) => (
                    <Card
                      key={index}
                      variant="interactive"
                      style={styles.actionCard}
                      onPress={action.action}
                    >
                      <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                        <Text style={[styles.actionIcon, { fontSize: 24 }]}>{action.icon}</Text>
                        <View>
                          <Text style={styles.actionLabel}>{action.label}</Text>
                          <Text style={styles.actionDescription}>{action.description}</Text>
                        </View>
                      </View>
                    </Card>
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



      <Modal
        isVisible={isCustomizeVisible}
        onClose={() => setIsCustomizeVisible(false)}
        title="Dashboard Layout"
        width={500}
      >
        <View style={styles.customizeModalContent}>
          <Text style={styles.customizeModalSubtitle}>Select which sections to display on your dashboard.</Text>
          <View style={styles.customizeList}>
            {/* ... (existing toggles map) */}
            {(Object.keys(visibleWidgets) as Array<keyof typeof visibleWidgets>).map((key) => (
              <TouchableOpacity
                key={key}
                style={styles.customizeItem}
                onPress={() => toggleWidget(key)}
                activeOpacity={0.7}
              >
                <View>
                  <Text style={styles.customizeItemLabel}>
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </Text>
                  <Text style={styles.customizeItemDesc}>
                    {key === 'stats' && 'Key metrics overview'}
                    {key === 'analytics' && 'Charts and health indicators'}
                    {key === 'quickActions' && 'Shortcuts to common tasks'}
                    {key === 'insights' && 'AI-driven recommendations'}
                  </Text>
                </View>
                <View style={[styles.toggleSwitch, visibleWidgets[key] && styles.toggleSwitchActive]}>
                  <View style={[styles.toggleThumb, visibleWidgets[key] && styles.toggleThumbActive]} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
  customizeItemDesc: {
    fontSize: 12,
    color: 'var(--slate-500)',
    marginTop: 2,
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
