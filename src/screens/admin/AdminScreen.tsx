import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';

interface AdminScreenProps {
  onNavigate: (screen: string) => void;
}

interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
  subscription?: string;
  subscriptionStatus?: string;
  subscriptionPeriod?: string;
  isActive?: boolean;
}

const TIERS = ['free', 'basic', 'premium'] as const;
type Tier = typeof TIERS[number];

const TIER_LABELS: Record<Tier, string> = {
  free: 'Free',
  basic: 'Basic',
  premium: 'Premium',
};

const AdminScreen: React.FC<AdminScreenProps> = ({ onNavigate, onSignOut }) => {
  const { token } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);
  const [updatingUsers, setUpdatingUsers] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    if (!token) return;

    try {
      const data = await apiClient.get<{ stats: any }>(
        '/admin/stats',
        token,
        { cache: true, cacheTTL: 5 * 60 * 1000 } // 5 minute cache for admin stats
      );
      setStats(data.stats);
    } catch (error) {
      logger.error('Error fetching admin stats', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchUsers = useCallback(async () => {
    if (!token) return;
    setUsersLoading(true);
    setError(null);

    try {
      const data = await apiClient.get<{ users: User[] }>(
        '/admin/users',
        token,
        { cache: false } // Don't cache users list to always get fresh data
      );
      setUsers(data.users);
    } catch (error: any) {
      logger.error('Error fetching users', error);
      setError(error.message || 'Failed to load users');
    } finally {
      setUsersLoading(false);
    }
  }, [token]);

  const updateUserTier = useCallback(async (userId: string, tier: Tier) => {
    if (!token) return;
    
    setUpdatingUsers((prev) => new Set(prev).add(userId));
    setError(null);
    setSuccess(null);

    try {
      const response = await apiClient.put<{ user: User; message: string }>(
        `/admin/users/${userId}/subscription`,
        { tier },
        token,
        { cache: false }
      );

      // Update the user in the local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, subscription: tier } : user
        )
      );

      setSuccess(`Successfully updated user tier to ${TIER_LABELS[tier]}`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
      
      // Clear cache to refresh stats
      apiClient.clearCache('/admin/stats');
      fetchStats();
    } catch (error: any) {
      logger.error('Error updating user tier', error);
      setError(error.message || 'Failed to update user tier');
      setTimeout(() => setError(null), 5000);
    } finally {
      setUpdatingUsers((prev) => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    }
  }, [token, fetchStats]);

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, [fetchStats, fetchUsers]);

  const renderTierDropdown = (user: User) => {
    const currentTier = (user.subscription || 'free') as Tier;
    const isUpdating = updatingUsers.has(user._id);

    return (
      <View style={styles.tierSelector}>
        {TIERS.map((tier) => (
          <TouchableOpacity
            key={tier}
            style={[
              styles.tierButton,
              currentTier === tier && styles.tierButtonActive,
              isUpdating && styles.tierButtonDisabled,
            ]}
            onPress={() => !isUpdating && updateUserTier(user._id, tier)}
            disabled={isUpdating}
          >
            <Text
              style={[
                styles.tierButtonText,
                currentTier === tier && styles.tierButtonTextActive,
              ]}
            >
              {TIER_LABELS[tier]}
            </Text>
          </TouchableOpacity>
        ))}
        {isUpdating && (
          <ActivityIndicator size="small" color="#6366f1" style={styles.updatingIndicator} />
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Loading stats...</Text>
        </View>
      ) : stats ? (
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalUsers}</Text>
            <Text style={styles.statLabel}>Total Users</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.activeUsers}</Text>
            <Text style={styles.statLabel}>Active Users</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalPayments}</Text>
            <Text style={styles.statLabel}>Total Payments</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>£{stats.totalRevenue.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Total Revenue</Text>
          </View>
        </View>
      ) : null}

      {/* Users Management Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>User Management</Text>
          <TouchableOpacity onPress={fetchUsers} style={styles.refreshButton}>
            <Text style={styles.refreshButtonText}>🔄 Refresh</Text>
          </TouchableOpacity>
        </View>

        {error && (
          <View style={styles.messageBoxError}>
            <Text style={styles.messageText}>{error}</Text>
          </View>
        )}

        {success && (
          <View style={styles.messageBoxSuccess}>
            <Text style={styles.messageText}>{success}</Text>
          </View>
        )}

        {usersLoading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#6366f1" />
            <Text style={styles.loadingText}>Loading users...</Text>
          </View>
        ) : users.length === 0 ? (
          <View style={styles.center}>
            <Text style={styles.emptyText}>No users found</Text>
          </View>
        ) : (
          <View style={styles.usersList}>
            {users.map((user) => (
              <View key={user._id} style={styles.userCard}>
                <View style={styles.userInfo}>
                  <View style={styles.userHeader}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <View style={[
                      styles.roleBadge,
                      user.role === 'admin' && styles.roleBadgeAdmin,
                    ]}>
                      <Text style={styles.roleText}>{user.role}</Text>
                    </View>
                  </View>
                  <Text style={styles.userEmail}>{user.email}</Text>
                  {user.subscriptionStatus && (
                    <Text style={styles.userStatus}>
                      Status: {user.subscriptionStatus}
                      {user.subscriptionPeriod && ` (${user.subscriptionPeriod})`}
                    </Text>
                  )}
                </View>
                <View style={styles.tierSection}>
                  <Text style={styles.tierLabel}>Subscription Tier:</Text>
                  {renderTierDropdown(user)}
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 10,
    color: '#6b7280',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  section: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    padding: 20,
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  refreshButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
  },
  refreshButtonText: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
  },
  messageBoxError: {
    backgroundColor: '#fee2e2',
    borderColor: '#fecaca',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  messageBoxSuccess: {
    backgroundColor: '#d1fae5',
    borderColor: '#a7f3d0',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  messageText: {
    color: '#1f2937',
    fontSize: 14,
  },
  usersList: {
    gap: 15,
  },
  userCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  userInfo: {
    marginBottom: 15,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  roleBadge: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleBadgeAdmin: {
    backgroundColor: '#fef3c7',
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textTransform: 'uppercase',
  },
  userEmail: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  userStatus: {
    fontSize: 12,
    color: '#9ca3af',
  },
  tierSection: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
  },
  tierLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  tierSelector: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  tierButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  tierButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  tierButtonDisabled: {
    opacity: 0.5,
  },
  tierButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  tierButtonTextActive: {
    color: '#ffffff',
  },
  updatingIndicator: {
    marginLeft: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 16,
    padding: 40,
  },
});

export default AdminScreen;
