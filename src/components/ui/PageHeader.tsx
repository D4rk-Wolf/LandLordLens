import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface PageHeaderProps {
  title: string;
  onSignOut: () => void;
  rightAction?: React.ReactNode;
  leftAction?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, onSignOut, rightAction, leftAction }) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {leftAction}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.rightSection}>
        {rightAction}
        <TouchableOpacity 
          style={styles.signOutButton} 
          onPress={onSignOut}
          activeOpacity={0.8}
        >
          <Text style={styles.signOutIcon}>🚪</Text>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.5,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  signOutIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  signOutText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PageHeader;
