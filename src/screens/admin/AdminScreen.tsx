import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';

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

const TIERS = ['free', 'starter', 'professional', 'business', 'enterprise'] as const;
type Tier = typeof TIERS[number];

const TIER_LABELS: Record<Tier, string> = {
  free: 'Free',
  starter: 'Starter',
  professional: 'Professional',
  business: 'Business',
  enterprise: 'Enterprise',
};

const AdminScreen: React.FC = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);
  const [updatingUsers, setUpdatingUsers] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const data = await apiClient.get<{ stats: any }>(
        '/admin/stats',
        token || undefined,
        { cache: true, cacheTTL: 5 * 60 * 1000 }
      );
      setStats(data.stats);
    } catch (error) {
      logger.error('Error fetching admin stats', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchUsers = useCallback(async () => {
    setUsersLoading(true);
    setError(null);

    try {
      const data = await apiClient.get<{ users: User[] }>(
        '/admin/users',
        token || undefined,
        { cache: false }
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
    setUpdatingUsers((prev) => new Set(prev).add(userId));
    setError(null);
    setSuccess(null);

    try {
      await apiClient.put<{ user: User; message: string }>(
        `/admin/users/${userId}/subscription`,
        { tier },
        token || undefined,
        { cache: false }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, subscription: tier } : user
        )
      );

      setSuccess(`Successfully updated user tier to ${TIER_LABELS[tier]}`);
      setTimeout(() => setSuccess(null), 3000);

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
    <div className="saas-content-scroll">
      <div className="saas-header" style={{ paddingLeft: 0, paddingRight: 0, marginBottom: 24, background: 'transparent', borderBottom: 'none' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Admin Dashboard</h1>

      </div>

      {loading ? (
        <div className="saas-loading-container" style={{ height: 300, background: 'transparent' }}>
          <ActivityIndicator size="large" color="#6366f1" />
          <div style={{ marginTop: 12, color: 'var(--text-muted)' }}>Loading stats...</div>
        </div>
      ) : stats ? (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
          <div className="saas-card" style={{ flex: 1, minWidth: '200px', padding: '24px' }}>
            <div style={{ fontSize: '36px', fontWeight: '700', color: 'var(--primary-600)', marginBottom: '4px', fontFamily: 'var(--font-display)' }}>
              {stats.totalUsers}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>Total Users</div>
          </div>
          <div className="saas-card" style={{ flex: 1, minWidth: '200px', padding: '24px' }}>
            <div style={{ fontSize: '36px', fontWeight: '700', color: 'var(--success-text)', marginBottom: '4px', fontFamily: 'var(--font-display)' }}>
              {stats.activeUsers}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>Active Users</div>
          </div>
          <div className="saas-card" style={{ flex: 1, minWidth: '200px', padding: '24px' }}>
            <div style={{ fontSize: '36px', fontWeight: '700', color: 'var(--info-text)', marginBottom: '4px', fontFamily: 'var(--font-display)' }}>
              {stats.totalPayments}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>Total Payments</div>
          </div>
          <div className="saas-card" style={{ flex: 1, minWidth: '200px', padding: '24px' }}>
            <div style={{ fontSize: '36px', fontWeight: '700', color: 'var(--primary-800)', marginBottom: '4px', fontFamily: 'var(--font-display)' }}>
              £{stats.totalRevenue.toFixed(2)}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>Total Revenue</div>
          </div>
        </div>
      ) : null}

      <div className="saas-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '18px' }}>User Management</h3>
          <button
            type="button"
            onClick={fetchUsers}
            className="btn btn-secondary"
            style={{ fontSize: '13px', padding: '6px 12px' }}
          >
            🔄 Refresh
          </button>
        </div>

        {error && (
          <div style={{ margin: '20px', padding: '12px', background: 'var(--danger-bg)', color: 'var(--danger-text)', borderRadius: '6px', border: '1px solid var(--danger-border)' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ margin: '20px', padding: '12px', background: 'var(--success-bg)', color: 'var(--success-text)', borderRadius: '6px', border: '1px solid var(--success-border)' }}>
            {success}
          </div>
        )}

        {usersLoading ? (
          <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <ActivityIndicator size="large" color="#6366f1" />
            <div style={{ marginTop: 12, color: 'var(--text-muted)' }}>Loading users...</div>
          </div>
        ) : users.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No users found</div>
        ) : (
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="saas-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Status</th>
                  <th>Current Tier</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="saas-avatar-placeholder" style={{ width: 36, height: 36, fontSize: 14 }}>
                          {user.name?.[0] || 'U'}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{user.name}</div>
                          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{user.email}</div>
                          {user.role === 'admin' && (
                            <span className="badge badge-warning" style={{ marginTop: '4px', fontSize: '10px' }}>ADMIN</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${user.subscriptionStatus === 'active' ? 'success' : 'warning'}`}>
                        {user.subscriptionStatus || 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-tier-${user.subscription || 'free'}`}>
                        {TIER_LABELS[user.subscription as Tier] || user.subscription || 'FREE'}
                      </span>
                    </td>
                    <td>
                      {renderTierDropdown(user)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = StyleSheet.create({

  tierSelector: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tierButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: 'var(--bg-surface)',
    borderWidth: 1,
    borderColor: 'var(--border-subtle)',
    cursor: 'pointer',
  } as any,
  tierButtonActive: {
    backgroundColor: 'var(--primary-600)',
    borderColor: 'var(--primary-600)',
  },
  tierButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  } as any,
  tierButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'var(--text-body)',
  },
  tierButtonTextActive: {
    color: '#ffffff',
  },
  updatingIndicator: {
    marginLeft: 8,
  },
});

export default AdminScreen;
