import React, { Suspense, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useWindowDimensions, useIsMobile } from '../hooks/useWindowDimensions';
import { PageTransition } from '../components/ui/PageTransition';

// Loading fallback component
const LoadingFallback: React.FC = () => (
    <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
    </View>
);

interface NavItem {
    to: string;
    label: string;
    icon: string;
    end?: boolean; // Exact match for root routes
}

const mainNavItems: NavItem[] = [
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/properties', label: 'Properties', icon: '🏠' },
    { to: '/compliance', label: 'Compliance', icon: '📋' },
    { to: '/analytics', label: 'Analytics', icon: '📈' },
    { to: '/maintenance', label: 'Maintenance', icon: '🔧' },
    { to: '/services', label: 'Services', icon: '🛒' },
];

const systemNavItems: NavItem[] = [
    { to: '/inspections', label: 'Inspections', icon: '🔍' },
    { to: '/expenses', label: 'Expenses', icon: '💰' },
    { to: '/pricing', label: 'Pricing', icon: '💳' },
    { to: '/legal/evictions', label: 'Legal (Evictions)', icon: '⚖️' },
];

const DashboardLayout: React.FC = () => {
    const { width } = useWindowDimensions();
    const isMobile = useIsMobile();
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(!isMobile);
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const getPageTitle = () => {
        // Simple logic to set header title based on current path
        const path = location.pathname;
        if (path.includes('/dashboard')) return 'Overview';
        if (path.includes('/properties')) return 'Properties';
        if (path.includes('/compliance')) return 'Compliance';
        if (path.includes('/analytics')) return 'Analytics';
        if (path.includes('/maintenance')) return 'Maintenance';
        if (path.includes('/inspections')) return 'Inspections';
        if (path.includes('/expenses')) return 'Expenses';
        if (path.includes('/settings')) return 'Settings';
        if (path.includes('/admin')) return 'Admin';
        if (path.includes('/pricing')) return 'Pricing';
        if (path.includes('/legal')) return 'Legal';
        if (path.includes('/services')) return 'Marketplace';
        return 'LandlordLens';
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
                            <span className="saas-logo-subtitle">Pro Management</span>
                        </div>
                    </div>
                </div>

                <div className="saas-nav-section">
                    <div className="saas-section-title">Main</div>
                    {mainNavItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) => `saas-nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => isMobile && setIsSidebarOpen(false)}
                        >
                            <span className="saas-nav-icon">{item.icon}</span>
                            <span className="saas-nav-label">{item.label}</span>
                        </NavLink>
                    ))}
                </div>

                <div className="saas-nav-section">
                    <div className="saas-section-title">System</div>
                    {systemNavItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => `saas-nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => isMobile && setIsSidebarOpen(false)}
                        >
                            <span className="saas-nav-icon">{item.icon}</span>
                            <span className="saas-nav-label">{item.label}</span>
                        </NavLink>
                    ))}

                    <div className="saas-divider" />

                    {user?.role === 'admin' && (
                        <NavLink
                            to="/admin"
                            className={({ isActive }) => `saas-nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => isMobile && setIsSidebarOpen(false)}
                        >
                            <span className="saas-nav-icon">👑</span>
                            <span className="saas-nav-label">Admin</span>
                        </NavLink>
                    )}

                    <NavLink
                        to="/settings"
                        className={({ isActive }) => `saas-nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => isMobile && setIsSidebarOpen(false)}
                    >
                        <span className="saas-nav-icon">⚙️</span>
                        <span className="saas-nav-label">Settings</span>
                    </NavLink>
                </div>

                {/* User Mini Profile at Bottom */}
                <div className="saas-user-profile">
                    <div className="saas-avatar-placeholder">{user?.name?.[0] || 'U'}</div>
                    <div className="saas-user-info">
                        <div className="saas-user-name">{user?.name || 'User'}</div>
                        <div className="saas-user-role">{user?.role || 'Landlord'}</div>
                    </div>
                    <TouchableOpacity
                        onPress={signOut}
                        style={{
                            padding: 8,
                            borderRadius: 6,
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <Text style={{ fontSize: 16 }}>🚪</Text>
                    </TouchableOpacity>
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
                            {getPageTitle()}
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
                        <PageTransition key={location.pathname}>
                            <Outlet />
                        </PageTransition>
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 400,
    }
});

export default DashboardLayout;
