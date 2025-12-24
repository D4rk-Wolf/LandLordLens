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
    <div className="saas-layout">
      {/* Mobile Menu Backdrop */}
      {isMobile && isSidebarOpen && (
        <div
          style={{
            position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40
          }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`saas-sidebar ${isMobile && !isSidebarOpen ? 'hidden' : ''}`}
        style={isMobile ? { position: 'absolute', height: '100%', transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)' } : {}}
      >
        <div className="saas-sidebar-header">
          <div className="saas-logo-row">
            <div className="saas-logo-badge">
              <span style={{ fontSize: '20px' }}>🏠</span>
            </div>
            <div className="saas-logo-text-col">
              <span className="saas-logo-title">LandLordLens</span>
              <span className="saas-logo-subtitle">Pro Managment</span>
            </div>
          </div>
        </div>

        <div className="saas-nav-section">
          <div className="saas-section-title">Main</div>
          {mainNavItems.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              isActive={isScreenActive(item.id)}
              onPress={() => { navigate(item.id); if (isMobile) setIsSidebarOpen(false); }}
            />
          ))}
        </div>

        <div className="saas-nav-section">
          <div className="saas-section-title">System</div>
          {systemNavItems.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              isActive={isScreenActive(item.id)}
              onPress={() => { navigate(item.id); if (isMobile) setIsSidebarOpen(false); }}
            />
          ))}

          <div className="saas-divider" />

          {user?.role === 'admin' && (
            <NavButton
              item={{ id: 'admin', label: 'Admin', icon: '👑' }}
              isActive={isScreenActive('admin')}
              onPress={() => { navigate('admin'); if (isMobile) setIsSidebarOpen(false); }}
            />
          )}

          <NavButton
            item={{ id: 'settings', label: 'Settings', icon: '⚙️' }}
            isActive={isScreenActive('settings')}
            onPress={() => { navigate('settings'); if (isMobile) setIsSidebarOpen(false); }}
          />
        </div>

        {/* User Mini Profile at Bottom */}
        <div className="saas-user-profile">
          <div className="saas-avatar-placeholder">{user?.name?.[0] || 'U'}</div>
          <div className="saas-user-info">
            <div className="saas-user-name">{user?.name || 'User'}</div>
            <div className="saas-user-role">{user?.role || 'Landlord'}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="saas-main">
        {/* Top Header */}
        <header className="saas-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {isMobile && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text-main)' }}
              >
                ☰
              </button>
            )}
            <h2 style={{ fontSize: '18px', margin: 0 }}>
              {mainNavItems.find(i => isScreenActive(i.id))?.label ||
                systemNavItems.find(i => isScreenActive(i.id))?.label ||
                (currentScreen === 'admin' ? 'Admin' : 'Overview')}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="saas-header-action">🔔</div>
            <div className="saas-header-action">Help</div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="saas-content-scroll">
          <Suspense fallback={<LoadingFallback />}>
            {renderScreen()}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Sidebar Items
const NavButton = ({ item, isActive, onPress }: { item: NavItem; isActive: boolean; onPress: () => void }) => (
  <button
    onClick={onPress}
    className={`saas-nav-item ${isActive ? 'active' : ''}`}
    type="button"
  >
    <span className="saas-nav-icon">{item.icon}</span>
    <span className="saas-nav-label">{item.label}</span>
  </button>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  }
});

export default MainNavigator;
