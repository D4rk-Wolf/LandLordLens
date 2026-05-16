import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { API_URL } from '../../utils/constants';
import { logger } from '../../utils/logger';
import PageHeader from '../../components/ui/PageHeader';

interface MaintenanceTicket {
  _id: string;
  propertyId: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  reportedBy?: string;
  createdAt: string;
}

import { Card } from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';

const MaintenanceScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaintenanceTickets();
  }, []);

  const fetchMaintenanceTickets = async () => {
    try {
      // This would fetch maintenance tickets - for now showing empty state
      setTickets([]);
    } catch (error) {
      logger.error('Error fetching maintenance tickets', error);
      Alert.alert('Error', 'Failed to load maintenance tickets');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityConfig = (priority: string) => {
    const configs: Record<string, { color: string; bgColor: string; icon: string }> = {
      urgent: { color: '#dc2626', bgColor: '#fee2e2', icon: '🔴' },
      high: { color: '#d97706', bgColor: '#fef3c7', icon: '🟠' },
      medium: { color: '#2563eb', bgColor: '#dbeafe', icon: '🔵' },
      low: { color: '#059669', bgColor: '#d1fae5', icon: '🟢' },
    };
    return configs[priority.toLowerCase()] || { color: '#6b7280', bgColor: '#f3f4f6', icon: '⚪' };
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { color: string; bgColor: string }> = {
      open: { color: '#2563eb', bgColor: '#dbeafe' },
      'in-progress': { color: '#d97706', bgColor: '#fef3c7' },
      resolved: { color: '#059669', bgColor: '#d1fae5' },
      closed: { color: '#6b7280', bgColor: '#f3f4f6' },
    };
    return configs[status.toLowerCase()] || { color: '#6b7280', bgColor: '#f3f4f6' };
  };

  return (
    <div className="saas-content-scroll">
      <PageHeader
        title="Maintenance"
        rightAction={
          <button
            onClick={() => navigate('/maintenance/new')}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span>➕</span>
            New Ticket
          </button>
        }
      />
      <div className="saas-layout-content">
        <div className="saas-subtitle-container" style={{ marginBottom: 24, padding: '16px', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', borderRadius: '8px' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Track and manage maintenance requests for your properties
          </div>
        </div>

        {loading ? (
          <div className="saas-loading-container" style={{ height: 300, background: 'transparent' }}>
            <ActivityIndicator size="large" color="#6366f1" />
            <div style={{ marginTop: 12, color: 'var(--text-muted)' }}>Loading maintenance tickets...</div>
          </div>
        ) : tickets.length === 0 ? (
          <View style={{ paddingHorizontal: 20 }}>
            <EmptyState
              icon="🔧"
              title="No Maintenance Tickets"
              description="Track and manage maintenance requests for your properties. Create a new ticket to get started."
              actionLabel="Create Your First Ticket"
              onAction={() => navigate('/maintenance/new')}
            />
          </View>
        ) : (
          <div style={{ padding: '0 20px', display: 'grid', gap: '16px', paddingBottom: '32px' }}>
            {tickets.map((ticket) => {
              const priorityConfig = getPriorityConfig(ticket.priority);
              const statusConfig = getStatusConfig(ticket.status);
              return (
                <Card
                  key={ticket._id}
                  variant="interactive"
                  onPress={() => {
                    // Could navigate to ticket detail screen
                  }}
                  style={{ padding: 20 }}
                >
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-main)', margin: 0, flex: 1, marginRight: '12px' }}>{ticket.title}</h3>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <span className="badge" style={{ backgroundColor: priorityConfig.bgColor, color: priorityConfig.color, border: `1px solid ${priorityConfig.color}40`, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>{priorityConfig.icon}</span> {ticket.priority}
                        </span>
                        <span className="badge" style={{ backgroundColor: statusConfig.bgColor, color: statusConfig.color, border: `1px solid ${statusConfig.color}40`, textTransform: 'capitalize' }}>
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5', margin: '0 0 16px 0' }}>
                    {ticket.description}
                  </p>
                  <div style={{ display: 'flex', gap: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                    {ticket.reportedBy && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '14px' }}>👤</span>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>{ticket.reportedBy}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '14px' }}>📅</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// No StyleSheet needed
const styles = {};

export default MaintenanceScreen;
