import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TenantInviteScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tenant Invite</Text>
      <Text style={styles.text}>This feature is coming soon.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#7f8c8d',
  },
});

export default TenantInviteScreen;
