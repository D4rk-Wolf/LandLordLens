import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface BreadcrumbItem {
  label: string;
  action?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          {index > 0 && <Text style={styles.separator}>/</Text>}
          {item.action ? (
            <TouchableOpacity onPress={item.action} activeOpacity={0.7}>
              <Text
                style={[
                  styles.item,
                  index === items.length - 1 && styles.itemActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text
              style={[
                styles.item,
                index === items.length - 1 && styles.itemActive,
              ]}
            >
              {item.label}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    fontSize: 14,
    color: '#9ca3af',
    marginHorizontal: 8,
  },
  item: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  itemActive: {
    color: '#111827',
    fontWeight: '600',
  },
});

export default Breadcrumb;
