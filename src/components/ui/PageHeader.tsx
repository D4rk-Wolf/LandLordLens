import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Breadcrumbs, { BreadcrumbItem } from './Breadcrumbs';

interface PageHeaderProps {
  title: string;
  onSignOut: () => void;
  rightAction?: React.ReactNode;
  leftAction?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, onSignOut, rightAction, leftAction, breadcrumbs }) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {leftAction}
        <View style={styles.titleSection}>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumbs items={breadcrumbs} />
          )}
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    //@ts-ignore
    backdropFilter: 'blur(12px)',
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //@ts-ignore - web only
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
    elevation: 4,
    zIndex: 10,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: 'var(--text-primary)',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  titleSection: {
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    //@ts-ignore - web only
    transition: 'all 0.2s ease',
  },
  signOutIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  signOutText: {
    color: 'var(--danger)',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default PageHeader;
