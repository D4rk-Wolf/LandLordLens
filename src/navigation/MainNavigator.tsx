import React, { Suspense, lazy, startTransition, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useWindowDimensions, useIsMobile } from '../hooks/useWindowDimensions';

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
const PricingScreen = lazy(() => import('../screens/pricing/PricingScreen'));

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
  | 'pricing'
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
  { id: 'pricing', label: 'Pricing', icon: '💳' },
];

const MainNavigator: React.FC<MainNavigatorProps> = ({ initialScreen = 'dashboard' }) => {
  const [currentScreen, setCurrentScreen] = React.useState<Screen>(initialScreen);
  const [selectedPropertyId, setSelectedPropertyId] = React.useState<string | null>(null);
  const { width } = useWindowDimensions();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(!isMobile);
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
          onSignOut={signOut}
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
          onSignOut={signOut}
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
          onSignOut={signOut}
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
          onSignOut={signOut}
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
          onSignOut={signOut}
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
          onSignOut={signOut}
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
          onSignOut={signOut}
        />
      );
    }

    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen onNavigate={navigate} onSignOut={signOut} />;
      case 'properties':
        return <PropertiesScreen onNavigate={navigate} onSelectProperty={navigateToPropertyDetail} onSignOut={signOut} />;
      case 'property-detail':
        return selectedPropertyId ? (
          <PropertyDetailScreen
            propertyId={selectedPropertyId}
            onNavigate={navigate}
            onBack={() => startTransition(() => setCurrentScreen('properties'))}
            onSignOut={signOut}
          />
        ) : null;
      case 'new-property':
        return <NewPropertyScreen onNavigate={navigate} onBack={() => startTransition(() => setCurrentScreen('properties'))} onSignOut={signOut} />;
      case 'compliance':
        return <ComplianceScreen onNavigate={navigate} onSignOut={signOut} />;
      case 'maintenance':
        return <MaintenanceScreen onNavigate={navigate} onSignOut={signOut} />;
      case 'new-maintenance':
        return <NewMaintenanceScreen onNavigate={navigate} onBack={() => startTransition(() => setCurrentScreen('maintenance'))} onSignOut={signOut} />;
      case 'inspections':
        return <InspectionsScreen onNavigate={navigate} onSignOut={signOut} />;
      case 'expenses':
        return <ExpensesScreen onNavigate={navigate} onSignOut={signOut} />;
      case 'admin':
        return user?.role === 'admin' ? <AdminScreen onNavigate={navigate} onSignOut={signOut} /> : null;
      case 'settings':
        return <SettingsScreen onNavigate={navigate} onSignOut={signOut} />;
      case 'pricing':
        return <PricingScreen onNavigate={navigate} onSignOut={signOut} />;
      default:
        return <DashboardScreen onNavigate={navigate} onSignOut={signOut} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <View style={styles.menuButtonContainer}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setIsSidebarOpen(!isSidebarOpen)}
            activeOpacity={0.8}
          >
            <Text style={styles.menuIcon}>{isSidebarOpen ? '✕' : '☰'}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Sidebar Backdrop for Mobile */}
      {isMobile && isSidebarOpen && (
        <TouchableOpacity
          style={styles.backdrop}
          onPress={() => setIsSidebarOpen(false)}
          activeOpacity={1}
        />
      )}

      <View style={[
        styles.sidebar,
        isMobile && !isSidebarOpen && styles.sidebarClosed,
        isMobile && isSidebarOpen && styles.sidebarMobile
      ]}>
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
                onPress={() => {
                  navigate(item.id);
                  // Close sidebar on mobile after navigation
                  if (isMobile) setIsSidebarOpen(false);
                }}
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
          {systemNavItems.map((item) => {
            const isActive = isScreenActive(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.navItem,
                  isActive && styles.navItemActive,
                ]}
                onPress={() => {
                  navigate(item.id);
                  if (isMobile) setIsSidebarOpen(false);
                }}
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
          {user?.role === 'admin' && (
            <TouchableOpacity
              style={[
                styles.navItem,
                isScreenActive('admin') && styles.navItemActive,
              ]}
              onPress={() => {
                navigate('admin');
                if (isMobile) setIsSidebarOpen(false);
              }}
              activeOpacity={0.8}
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
            onPress={() => {
              navigate('settings');
              if (isMobile) setIsSidebarOpen(false);
            }}
            activeOpacity={0.8}
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
    position: 'relative',
  },
  sidebar: {
    width: 280,
    backgroundColor: 'var(--bg-primary)',
    borderRightWidth: 1,
    borderRightColor: 'var(--gray-200)',
    flexDirection: 'column',
    boxShadow: '4px 0px 16px 0px rgba(0, 0, 0, 0.04)',
    elevation: 5,
    zIndex: 1000,
    //@ts-ignore
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease',
  },
  sidebarClosed: {
    position: 'absolute',
    height: '100%',
    //@ts-ignore
    transform: [{ translateX: -280 }],
  },
  sidebarMobile: {
    position: 'absolute',
    height: '100%',
    // @ts-ignore
    transform: [{ translateX: 0 }],
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 999,
    //@ts-ignore
    backdropFilter: 'blur(4px)',
    transition: 'opacity 0.3s ease',
  },
  sidebarHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'var(--gray-100)',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logoIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'var(--primary-light)',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  logoIcon: {
    fontSize: 24,
  },
  logoTextContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '800',
    color: 'var(--text-primary)',
    letterSpacing: -0.5,
  },
  logoSubtext: {
    fontSize: 10,
    color: 'var(--text-tertiary)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  navSection: {
    paddingVertical: 12,
    flex: 1,
  },
  navSectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: 'var(--text-tertiary)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 24,
    marginBottom: 8,
    marginTop: 12,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 14,
    backgroundColor: 'transparent',
    //@ts-ignore
    transition: 'all 0.2s ease',
  },
  navItemActive: {
    backgroundColor: 'var(--primary)',
    boxShadow: '0 4px 12px hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.2)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  navIcon: {
    fontSize: 18,
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'var(--text-secondary)',
    flex: 1,
  },
  navLabelActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  content: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  contentInner: {
    flex: 1,
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },
  menuButtonContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1001,
  },
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'var(--glass-bg)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'var(--glass-border)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  menuIcon: {
    fontSize: 20,
  },
});

export default MainNavigator;
