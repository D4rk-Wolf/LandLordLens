import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
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

interface MaintenanceScreenProps {
  onNavigate: (screen: string) => void;
}

const MaintenanceScreen: React.FC<MaintenanceScreenProps> = ({ onNavigate }) => {
  const { token } = useAuth();
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
    <View style={styles.container}>
      <PageHeader 
        title="Maintenance" 
        onSignOut={onSignOut}
        rightAction={
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onNavigate('new-maintenance')}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonIcon}>➕</Text>
            <Text style={styles.addButtonText}>New Ticket</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            Track and manage maintenance requests for your properties
          </Text>
        </View>

      {loading ? (
        <View style={styles.center}>
          <Text style={styles.text}>Loading maintenance tickets...</Text>
        </View>
      ) : tickets.length === 0 ? (
        <View style={styles.content}>
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Text style={styles.emptyIcon}>🔧</Text>
            </View>
            <Text style={styles.emptyTitle}>No Maintenance Tickets</Text>
            <Text style={styles.emptyText}>
              Track and manage maintenance requests for your properties. Create a new ticket to get started.
            </Text>
            <TouchableOpacity
              style={styles.addButtonLarge}
              onPress={() => onNavigate('new-maintenance')}
              activeOpacity={0.8}
            >
              <Text style={styles.addButtonText}>Create Your First Ticket</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.content}>
          {tickets.map((ticket) => {
            const priorityConfig = getPriorityConfig(ticket.priority);
            const statusConfig = getStatusConfig(ticket.status);
            return (
              <TouchableOpacity
                key={ticket._id}
                style={styles.ticketCard}
                onPress={() => {
                  // Could navigate to ticket detail screen
                }}
                activeOpacity={0.7}
              >
                <View style={styles.ticketHeader}>
                  <View style={styles.ticketTitleContainer}>
                    <Text style={styles.ticketTitle}>{ticket.title}</Text>
                    <View style={styles.badgesContainer}>
                      <View
                        style={[
                          styles.priorityBadge,
                          { backgroundColor: priorityConfig.bgColor },
                        ]}
                      >
                        <Text style={styles.priorityIcon}>{priorityConfig.icon}</Text>
                        <Text
                          style={[
                            styles.badgeText,
                            { color: priorityConfig.color },
                          ]}
                        >
                          {ticket.priority}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.statusBadge,
                          { backgroundColor: statusConfig.bgColor },
                        ]}
                      >
                        <Text
                          style={[
                            styles.badgeText,
                            { color: statusConfig.color },
                          ]}
                        >
                          {ticket.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <Text style={styles.ticketDescription} numberOfLines={2}>
                  {ticket.description}
                </Text>
                <View style={styles.ticketFooter}>
                  {ticket.reportedBy && (
                    <View style={styles.ticketMeta}>
                      <Text style={styles.ticketMetaIcon}>👤</Text>
                      <Text style={styles.ticketMetaText}>{ticket.reportedBy}</Text>
                    </View>
                  )}
                  <View style={styles.ticketMeta}>
                    <Text style={styles.ticketMetaIcon}>📅</Text>
                    <Text style={styles.ticketMetaText}>
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  subtitleContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '400',
  },
  addButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addButtonIcon: {
    fontSize: 16,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    minHeight: 400,
  },
  text: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  emptyState: {
    backgroundColor: '#ffffff',
    padding: 40,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
    maxWidth: 300,
  },
  addButtonLarge: {
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    boxShadow: '0px 4px 8px 0px rgba(99, 102, 241, 0.3)',
    elevation: 4,
  },
  ticketCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.05)',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  ticketHeader: {
    marginBottom: 12,
  },
  ticketTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 8,
    flexShrink: 0,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  priorityIcon: {
    fontSize: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  ticketDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  ticketFooter: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  ticketMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ticketMetaIcon: {
    fontSize: 14,
  },
  ticketMetaText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
});

export default MaintenanceScreen;
