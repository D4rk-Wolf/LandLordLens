import React, { Suspense, lazy, startTransition, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

// Lazy load screens for code splitting
const DashboardScreen = lazy(() => import('../screens/dashboard/DashboardScreen'));
const PropertiesScreen = lazy(() => import('../screens/properties/PropertiesScreen'));
const PropertyDetailScreen = lazy(() => import('../screens/properties/PropertyDetailScreen'));
const NewPropertyScreen = lazy(() => import('../screens/properties/NewPropertyScreen'));
const NewTenancyScreen = lazy(() => import('../screens/properties/NewTenancyScreen'));
const NewComplianceScreen = lazy(() => import('../screens/properties/NewComplianceScreen'));
const ComplianceScreen = lazy(() => import('../screens/compliance/ComplianceScreen'));
const MaintenanceScreen = lazy(() => import('../screens/maintenance/MaintenanceScreen'));
const NewMaintenanceScreen = lazy(() => import('../screens/maintenance/NewMaintenanceScreen'));
const InspectionsScreen = lazy(() => import('../screens/inspections/InspectionsScreen'));
const ExpensesScreen = lazy(() => import('../screens/expenses/ExpensesScreen'));
const DepositProtectionScreen = lazy(() => import('../screens/tenancies/DepositProtectionScreen'));
const RightToRentScreen = lazy(() => import('../screens/tenancies/RightToRentScreen'));
const TenantBackgroundCheckScreen = lazy(() => import('../screens/tenancies/TenantBackgroundCheckScreen'));
const InventoryScreen = lazy(() => import('../screens/tenancies/InventoryScreen'));
const AdminScreen = lazy(() => import('../screens/admin/AdminScreen'));
const SettingsScreen = lazy(() => import('../screens/settings/SettingsScreen'));

// Loading fallback component
const LoadingFallback: React.FC = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#6366f1" />
  </View>
);

type Screen = 
  | 'dashboard'
  | 'properties'
  | 'property-detail'
  | 'new-property'
  | 'compliance'
  | 'maintenance'
  | 'new-maintenance'
  | 'admin'
  | 'settings'
  | string; // Allow dynamic screens like 'new-tenancy-{id}'

interface MainNavigatorProps {
  initialScreen?: Screen;
}

interface NavItem {
  id: Screen;
  label: string;
  icon: string;
}

const mainNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'properties', label: 'Properties', icon: '🏠' },
  { id: 'compliance', label: 'Compliance', icon: '📋' },
  { id: 'maintenance', label: 'Maintenance', icon: '🔧' },
];

const systemNavItems: NavItem[] = [
  { id: 'inspections', label: 'Inspections', icon: '🔍' },
  { id: 'expenses', label: 'Expenses', icon: '💰' },
];

const MainNavigator: React.FC<MainNavigatorProps> = ({ initialScreen = 'dashboard' }) => {
  const [currentScreen, setCurrentScreen] = React.useState<Screen>(initialScreen);
  const [selectedPropertyId, setSelectedPropertyId] = React.useState<string | null>(null);
  const { user, signOut } = useAuth();

  // Wrap navigation in startTransition to prevent suspension during synchronous input
  const navigate = useCallback((screen: Screen) => {
    startTransition(() => {
      setCurrentScreen(screen);
    });
  }, []);

  const navigateToPropertyDetail = useCallback((propertyId: string) => {
    setSelectedPropertyId(propertyId);
    startTransition(() => {
      setCurrentScreen('property-detail');
    });
  }, []);

  const isScreenActive = (screenId: Screen): boolean => {
    if (typeof screenId === 'string' && typeof currentScreen === 'string') {
      return currentScreen === screenId || currentScreen.startsWith(screenId + '-');
    }
    return currentScreen === screenId;
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = isScreenActive(item.id);
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.navItem,
          isActive && styles.navItemActive,
        ]}
        onPress={() => navigate(item.id)}
        activeOpacity={0.8}
        // @ts-ignore - for web hover effects
        data-testid={`nav-item-${item.id}${isActive ? '-active' : ''}`}
      >
        <View style={[
          styles.navIconContainer,
          isActive && styles.navIconContainerActive,
        ]}>
          <Text style={[
            styles.navIcon,
            isActive && styles.navIconActive,
          ]}>
            {item.icon}
          </Text>
        </View>
        <Text
          style={[
            styles.navLabel,
            isActive && styles.navLabelActive,
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderScreen = () => {
    // Handle dynamic screens with property IDs
    if (currentScreen.startsWith('new-tenancy-')) {
      const propertyId = currentScreen.replace('new-tenancy-', '');
      return (
        <NewTenancyScreen
          propertyId={propertyId}
          onNavigate={navigate}
          onBack={() => {
            setSelectedPropertyId(propertyId);
            startTransition(() => {
              setCurrentScreen('property-detail');
            });
          }}
        />
      );
    }

    if (currentScreen.startsWith('new-compliance-')) {
      const propertyId = currentScreen.replace('new-compliance-', '');
      return (
        <NewComplianceScreen
          propertyId={propertyId}
          onNavigate={navigate}
          onBack={() => {
            setSelectedPropertyId(propertyId);
            startTransition(() => {
              setCurrentScreen('property-detail');
            });
          }}
        />
      );
    }

    if (currentScreen.startsWith('new-maintenance-')) {
      const propertyId = currentScreen.replace('new-maintenance-', '');
      return (
        <NewMaintenanceScreen
          propertyId={propertyId}
          onNavigate={navigate}
          onBack={() => {
            setSelectedPropertyId(propertyId);
            startTransition(() => {
              setCurrentScreen('property-detail');
            });
          }}
        />
      );
    }

    if (currentScreen.startsWith('deposit-protection-')) {
      const tenancyId = currentScreen.replace('deposit-protection-', '');
      return (
        <DepositProtectionScreen
          tenancyId={tenancyId}
          onNavigate={navigate}
          onBack={() => {
            startTransition(() => {
              if (selectedPropertyId) {
                setCurrentScreen('property-detail');
              } else {
                setCurrentScreen('properties');
              }
            });
          }}
        />
      );
    }

    if (currentScreen.startsWith('right-to-rent-')) {
      const tenancyId = currentScreen.replace('right-to-rent-', '');
      return (
        <RightToRentScreen
          tenancyId={tenancyId}
          onNavigate={navigate}
          onBack={() => {
            startTransition(() => {
              if (selectedPropertyId) {
                setCurrentScreen('property-detail');
              } else {
                setCurrentScreen('properties');
              }
            });
          }}
        />
      );
    }

    if (currentScreen.startsWith('background-check-')) {
      const tenancyId = currentScreen.replace('background-check-', '');
      return (
        <TenantBackgroundCheckScreen
          tenancyId={tenancyId}
          onNavigate={navigate}
          onBack={() => {
            startTransition(() => {
              if (selectedPropertyId) {
                setCurrentScreen('property-detail');
              } else {
                setCurrentScreen('properties');
              }
            });
          }}
        />
      );
    }

    if (currentScreen.startsWith('inventory-')) {
      const tenancyId = currentScreen.replace('inventory-', '');
      return (
        <InventoryScreen
          tenancyId={tenancyId}
          onNavigate={navigate}
          onBack={() => {
            startTransition(() => {
              if (selectedPropertyId) {
                setCurrentScreen('property-detail');
              } else {
                setCurrentScreen('properties');
              }
            });
          }}
        />
      );
    }

    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen onNavigate={navigate} />;
      case 'properties':
        return <PropertiesScreen onNavigate={navigate} onSelectProperty={navigateToPropertyDetail} />;
      case 'property-detail':
        return selectedPropertyId ? (
          <PropertyDetailScreen 
            propertyId={selectedPropertyId} 
            onNavigate={navigate}
            onBack={() => startTransition(() => setCurrentScreen('properties'))}
          />
        ) : null;
      case 'new-property':
        return <NewPropertyScreen onNavigate={navigate} onBack={() => startTransition(() => setCurrentScreen('properties'))} />;
      case 'compliance':
        return <ComplianceScreen onNavigate={navigate} />;
      case 'maintenance':
        return <MaintenanceScreen onNavigate={navigate} />;
      case 'new-maintenance':
        return <NewMaintenanceScreen onNavigate={navigate} onBack={() => startTransition(() => setCurrentScreen('maintenance'))} />;
      case 'inspections':
        return <InspectionsScreen onNavigate={navigate} />;
      case 'expenses':
        return <ExpensesScreen onNavigate={navigate} />;
      case 'admin':
        return user?.role === 'admin' ? <AdminScreen onNavigate={navigate} /> : null;
      case 'settings':
        return <SettingsScreen onNavigate={navigate} />;
      default:
        return <DashboardScreen onNavigate={navigate} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <View style={styles.sidebarHeader}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIconContainer}>
              <Text style={styles.logoIcon}>🏠</Text>
            </View>
            <View style={styles.logoTextContainer}>
              <Text style={styles.logoText}>LandlordLens</Text>
              <Text style={styles.logoSubtext}>Property Management</Text>
            </View>
          </View>
        </View>

        <View style={styles.navSection}>
          <Text style={styles.navSectionLabel}>Main</Text>
          {mainNavItems.map((item) => {
            const isActive = isScreenActive(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.navItem,
                  isActive && styles.navItemActive,
                ]}
                onPress={() => navigate(item.id)}
                activeOpacity={0.8}
              >
                <View style={[
                  styles.navIconContainer,
                  isActive && styles.navIconContainerActive,
                ]}>
                  <Text style={[
                    styles.navIcon,
                    isActive && styles.navIconActive,
                  ]}>
                    {item.icon}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.navLabel,
                    isActive && styles.navLabelActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.navSection}>
          <Text style={styles.navSectionLabel}>System</Text>
          {systemNavItems.map(renderNavItem)}
          {user?.role === 'admin' && (
            <TouchableOpacity
              style={[
                styles.navItem,
                isScreenActive('admin') && styles.navItemActive,
              ]}
              onPress={() => navigate('admin')}
              activeOpacity={0.8}
              // @ts-ignore - for web hover effects
              data-testid={`nav-item-admin${isScreenActive('admin') ? '-active' : ''}`}
            >
              <View style={[
                styles.navIconContainer,
                isScreenActive('admin') && styles.navIconContainerActive,
              ]}>
                <Text style={[
                  styles.navIcon,
                  isScreenActive('admin') && styles.navIconActive,
                ]}>
                  👑
                </Text>
              </View>
              <Text
                style={[
                  styles.navLabel,
                  isScreenActive('admin') && styles.navLabelActive,
                ]}
              >
                Admin
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[
              styles.navItem,
              isScreenActive('settings') && styles.navItemActive,
            ]}
            onPress={() => navigate('settings')}
            activeOpacity={0.8}
            // @ts-ignore - for web hover effects
            data-testid={`nav-item-settings${isScreenActive('settings') ? '-active' : ''}`}
          >
            <View style={[
              styles.navIconContainer,
              isScreenActive('settings') && styles.navIconContainerActive,
            ]}>
              <Text style={[
                styles.navIcon,
                isScreenActive('settings') && styles.navIconActive,
              ]}>
                ⚙️
              </Text>
            </View>
            <Text
              style={[
                styles.navLabel,
                isScreenActive('settings') && styles.navLabelActive,
              ]}
            >
              Settings
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sidebarFooter}>
          <View style={styles.userInfo}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName} numberOfLines={1}>
                {user?.name || 'User'}
              </Text>
              <Text style={styles.userEmail} numberOfLines={1}>
                {user?.email || ''}
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.signOutButton} 
            onPress={signOut}
            activeOpacity={0.8}
          >
            <Text style={styles.signOutIcon}>🚪</Text>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.contentInner}>
          <Suspense fallback={<LoadingFallback />}>
            {renderScreen()}
          </Suspense>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  sidebar: {
    width: 280,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '4px 0px 16px 0px rgba(0, 0, 0, 0.08)',
    elevation: 5,
    zIndex: 1000,
  },
  sidebarHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingBottom: 28,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  logoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e7ff',
  },
  logoIcon: {
    fontSize: 28,
  },
  logoTextContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
    lineHeight: 24,
  },
  logoSubtext: {
    fontSize: 11,
    color: '#9ca3af',
    fontWeight: '500',
    marginTop: 2,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  navSection: {
    paddingVertical: 8,
    flex: 1,
    paddingTop: 20,
  },
  navSectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 20,
    marginBottom: 12,
    paddingTop: 8,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    marginVertical: 2,
    borderRadius: 12,
    position: 'relative',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
  },
  navItemActive: {
    backgroundColor: '#6366f1',
    boxShadow: '0px 2px 8px 0px rgba(99, 102, 241, 0.15)',
    elevation: 2,
  },
  navIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: 'transparent',
  },
  navIconContainerActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  navIcon: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 20,
  },
  navIconActive: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    flex: 1,
    letterSpacing: 0.1,
  },
  navLabelActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  sidebarFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    backgroundColor: '#fafbfc',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
    paddingBottom: 16,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e7ff',
    boxShadow: '0px 2px 4px 0px rgba(99, 102, 241, 0.2)',
    elevation: 2,
  },
  userAvatarText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  userDetails: {
    flex: 1,
    minWidth: 0,
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 3,
    letterSpacing: -0.2,
  },
  userEmail: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '400',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    paddingHorizontal: 18,
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#fecaca',
    boxShadow: '0px 2px 4px 0px rgba(220, 38, 38, 0.1)',
    elevation: 1,
  },
  signOutIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  signOutText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  content: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  contentInner: {
    flex: 1,
    width: '100%',
    maxWidth: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    minHeight: 400,
  },
});

export default MainNavigator;
