import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Breadcrumbs, { BreadcrumbItem } from './Breadcrumbs';

interface PageHeaderProps {
  title: string;
  rightAction?: React.ReactNode;
  leftAction?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, rightAction, leftAction, breadcrumbs }) => {
  return (
    <View style={styles.container}>
      {/* Breadcrumbs Row */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <View style={styles.breadcrumbRow}>
          <Breadcrumbs items={breadcrumbs} />
        </View>
      )}

      <View style={styles.header}>
        <View style={styles.leftSection}>
          {leftAction}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
        <View style={styles.rightSection}>
          {rightAction}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    paddingHorizontal: 0, // Padding handled by parent container usually or added here if needed
  },
  breadcrumbRow: {
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Align start to handle tall right actions
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  title: {
    fontSize: 28, // Slightly larger
    fontWeight: '700',
    color: 'var(--text-main)',
    fontFamily: 'var(--font-display)',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: 'var(--text-muted)',
    marginTop: 4,
  },
  titleSection: {
    flex: 1,
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
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'var(--slate-200)',
  },
  signOutIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  signOutText: {
    color: 'var(--slate-600)',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default PageHeader;
