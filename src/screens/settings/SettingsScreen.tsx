import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';
import PageHeader from '../../components/ui/PageHeader';
import { useTheme } from '../../contexts/ThemeContext';
import { useNotification } from '../../contexts/NotificationContext';

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
  onSignOut: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onSignOut }) => {
  const { user, token } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const { showNotification } = useNotification();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [changingPassword, setChangingPassword] = useState(false);

  const handleUpdateProfile = () => {
    showNotification('Profile updated successfully!', 'success');
  };

  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all password fields');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters long');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    setChangingPassword(true);
    try {
      await apiClient.post(
        '/auth/change-password',
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        token || undefined
      );

      showNotification('Password changed successfully!', 'success');
      Alert.alert('Success', 'Password changed successfully', [
        {
          text: 'OK',
          onPress: () => {
            setShowPasswordForm(false);
            setPasswordData({
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            });
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  const settingsSections = [
    {
      title: 'Account Information',
      items: [
        { label: 'Name', value: user?.name || 'N/A', icon: '👤' },
        { label: 'Email', value: user?.email || 'N/A', icon: '✉️' },
        { label: 'Role', value: user?.role || 'N/A', icon: '🔑' },
        ...(user?.subscription ? [{ label: 'Subscription', value: user.subscription, icon: '💳' }] : []),
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <PageHeader title="Settings" onSignOut={onSignOut} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Preference Center</Text>
          <Text style={styles.subtitle}>Manage your account and platform settings</Text>
        </View>

        <View style={styles.contentWrapper}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Appearance</Text>
            </View>
            <View style={styles.sectionContent}>
              <TouchableOpacity
                style={[styles.themeToggle, isDark && styles.themeToggleActive]}
                onPress={() => {
                  toggleTheme();
                  showNotification(`Switched to ${isDark ? 'light' : 'dark'} mode`, 'info');
                }}
                activeOpacity={0.8}
              >
                <View style={styles.infoRowLeft}>
                  <View style={styles.infoIconContainer}>
                    <Text style={styles.infoIcon}>{isDark ? '🌙' : '☀️'}</Text>
                  </View>
                  <View>
                    <Text style={styles.infoLabel}>Display Theme</Text>
                    <Text style={styles.themeSubtitle}>Current: {isDark ? 'Dark Mode' : 'Light Mode'}</Text>
                  </View>
                </View>
                <View style={[styles.toggleSwitch, isDark && styles.toggleSwitchActive]}>
                  <View style={[styles.toggleThumb, isDark && styles.toggleThumbActive]} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {settingsSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              <View style={styles.sectionContent}>
                {section.items.map((item, itemIndex) => (
                  <View
                    key={itemIndex}
                    style={[
                      styles.infoRow,
                      itemIndex === section.items.length - 1 && styles.infoRowLast,
                    ]}
                  >
                    <View style={styles.infoRowLeft}>
                      <View style={styles.infoIconContainer}>
                        <Text style={styles.infoIcon}>{item.icon}</Text>
                      </View>
                      <Text style={styles.infoLabel}>{item.label}</Text>
                    </View>
                    <Text style={styles.infoValue} numberOfLines={1}>
                      {item.value}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Security</Text>
            </View>
            <View style={styles.sectionContent}>
              {!showPasswordForm ? (
                <TouchableOpacity
                  style={styles.changePasswordButton}
                  onPress={() => setShowPasswordForm(true)}
                  activeOpacity={0.8}
                >
                  <View style={styles.changePasswordIconContainer}>
                    <Text style={styles.changePasswordIcon}>🔒</Text>
                  </View>
                  <Text style={styles.changePasswordButtonText}>Change Account Password</Text>
                  <Text style={styles.buttonArrow}>→</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.passwordForm}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Current Password</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        value={passwordData.currentPassword}
                        onChangeText={(text) =>
                          setPasswordData({ ...passwordData, currentPassword: text })
                        }
                        secureTextEntry
                        placeholder="••••••••"
                        placeholderTextColor="#94a3b8"
                      />
                    </View>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>New Password</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        value={passwordData.newPassword}
                        onChangeText={(text) =>
                          setPasswordData({ ...passwordData, newPassword: text })
                        }
                        secureTextEntry
                        placeholder="At least 6 characters"
                        placeholderTextColor="#94a3b8"
                      />
                    </View>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Confirm New Password</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        value={passwordData.confirmPassword}
                        onChangeText={(text) =>
                          setPasswordData({ ...passwordData, confirmPassword: text })
                        }
                        secureTextEntry
                        placeholder="Repeat new password"
                        placeholderTextColor="#94a3b8"
                      />
                    </View>
                  </View>

                  <View style={styles.passwordFormActions}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => {
                        setShowPasswordForm(false);
                        setPasswordData({
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: '',
                        });
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.cancelButtonText}>Discard Changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.savePasswordButton, changingPassword && styles.savePasswordButtonDisabled]}
                      onPress={handleChangePassword}
                      disabled={changingPassword}
                      activeOpacity={0.9}
                    >
                      <Text style={styles.savePasswordButtonText}>
                        {changingPassword ? 'Updating...' : 'Update Password'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>

          <View style={styles.actionsSection}>
            <TouchableOpacity
              style={styles.signOutButton}
              onPress={onSignOut}
              activeOpacity={0.9}
            >
              <Text style={styles.signOutIcon}>🚪</Text>
              <Text style={styles.signOutButtonText}>Secure Logout</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoBadgeIcon}>🏠</Text>
            </View>
            <Text style={styles.footerText}>LandlordLens PRO</Text>
            <Text style={styles.footerSubtext}>Version 2.0.0 • Premium Experience</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 60,
    paddingHorizontal: 32,
    maxWidth: 1000,
    width: '100%',
    alignSelf: 'center',
  },
  welcomeSection: {
    marginTop: 48,
    marginBottom: 40,
  },
  greeting: {
    fontSize: 16,
    color: 'var(--primary)',
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 32,
    fontWeight: '800',
    color: 'var(--text-primary)',
    letterSpacing: -1,
    lineHeight: 40,
  },
  contentWrapper: {
    gap: 40,
  },
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    marginBottom: 16,
    paddingLeft: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: 'var(--text-primary)',
    letterSpacing: -0.5,
  },
  sectionContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    //@ts-ignore
    backdropFilter: 'blur(16px)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.03)',
  },
  infoRowLast: {
    borderBottomWidth: 0,
  },
  infoRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 24,
  },
  infoIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.03)',
  },
  infoIcon: {
    fontSize: 20,
  },
  infoLabel: {
    fontSize: 16,
    color: 'var(--text-secondary)',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: 'var(--text-primary)',
    fontWeight: '700',
  },
  changePasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'transparent',
    transition: 'all 0.2s ease',
  },
  changePasswordIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'var(--primary-light)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  changePasswordIcon: {
    fontSize: 20,
  },
  changePasswordButtonText: {
    color: 'var(--text-primary)',
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  buttonArrow: {
    fontSize: 20,
    color: 'var(--primary)',
    fontWeight: '600',
  },
  passwordForm: {
    padding: 32,
    gap: 24,
  },
  inputContainer: {
    marginBottom: 0,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: 10,
    marginLeft: 4,
  },
  inputWrapper: {
    borderWidth: 1.5,
    borderColor: 'var(--gray-200)',
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 16,
    minHeight: 56,
    justifyContent: 'center',
    //@ts-ignore
    transition: 'all 0.2s ease',
  },
  input: {
    fontSize: 16,
    color: 'var(--text-primary)',
    paddingVertical: 14,
    fontWeight: '500',
  },
  passwordFormActions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'var(--gray-200)',
    //@ts-ignore
    transition: 'all 0.2s ease',
  },
  cancelButtonText: {
    color: 'var(--text-secondary)',
    fontSize: 15,
    fontWeight: '700',
  },
  savePasswordButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: 'var(--primary)',
    backgroundImage: 'var(--primary-gradient)',
    alignItems: 'center',
    boxShadow: '0 8px 20px hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.2)',
    //@ts-ignore
    transition: 'all 0.2s ease',
  },
  savePasswordButtonDisabled: {
    opacity: 0.5,
    boxShadow: 'none',
  },
  savePasswordButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  actionsSection: {
    marginTop: 8,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.15)',
    gap: 12,
    //@ts-ignore
    transition: 'all 0.2s ease',
  },
  signOutIcon: {
    fontSize: 20,
  },
  signOutButtonText: {
    color: 'var(--danger)',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  logoBadge: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
  logoBadgeIcon: {
    fontSize: 24,
  },
  footerText: {
    fontSize: 15,
    color: 'var(--text-primary)',
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  footerSubtext: {
    fontSize: 13,
    color: 'var(--text-tertiary)',
    fontWeight: '500',
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    transition: 'all 0.2s ease',
  },
  themeToggleActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  themeSubtitle: {
    fontSize: 13,
    color: 'var(--text-tertiary)',
    marginTop: 2,
    fontWeight: '500',
  },
  toggleSwitch: {
    width: 60,
    height: 32,
    borderRadius: 20,
    backgroundColor: 'var(--gray-200)',
    padding: 4,
    transition: 'all 0.3s ease',
  },
  toggleSwitchActive: {
    backgroundColor: 'var(--primary)',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  toggleThumbActive: {
    transform: 'translateX(28px)',
  },
});

export default SettingsScreen;
