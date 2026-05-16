import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';
import PageHeader from '../../components/ui/PageHeader';
import { useTheme } from '../../contexts/ThemeContext';
import { useNotification } from '../../contexts/NotificationContext';

const SettingsScreen: React.FC = () => {
  const { user, token } = useAuth();
  const { theme, toggleTheme, isDark, themeMode, setThemeMode } = useTheme();
  const { showNotification } = useNotification();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [changingPassword, setChangingPassword] = useState(false);

  const handleUpdateProfile = () => {
    showNotification('Profile settings saved.', 'success');
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

      showNotification('Security credentials updated.', 'success');
      Alert.alert('Success', 'Your password has been securely updated.', [
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

  // General Preferences State
  const [currency, setCurrencyState] = useState('USD');
  const [dateFormat, setDateFormatState] = useState('MM/DD/YYYY');

  // Notification State
  const [emailAlerts, setEmailAlertsState] = useState(true);
  const [pushNotifications, setPushNotificationsState] = useState(true);
  const [marketingEmails, setMarketingEmailsState] = useState(false);

  // Security State
  const [twoFactorEnabled, setTwoFactorEnabledState] = useState(false);

  // Load preferences on mount
  React.useEffect(() => {
    const loadPreference = (key: string, setter: React.Dispatch<React.SetStateAction<any>>, defaultVal: any) => {
      const saved = localStorage.getItem(key);
      if (saved !== null) {
        try {
          setter(JSON.parse(saved));
        } catch (e) {
          setter(saved); // Fallback for strings
        }
      } else {
        setter(defaultVal);
      }
    };

    loadPreference('settings_currency', setCurrencyState, 'USD');
    loadPreference('settings_dateFormat', setDateFormatState, 'MM/DD/YYYY');
    loadPreference('settings_emailAlerts', setEmailAlertsState, true);
    loadPreference('settings_pushNotifications', setPushNotificationsState, true);
    loadPreference('settings_marketingEmails', setMarketingEmailsState, false);
    loadPreference('settings_2fa', setTwoFactorEnabledState, false);
  }, []);

  // Wrappers to save on change
  const setCurrency = (val: string) => { setCurrencyState(val); localStorage.setItem('settings_currency', val); };
  const setDateFormat = (val: string) => { setDateFormatState(val); localStorage.setItem('settings_dateFormat', val); };

  const setEmailAlerts = (val: boolean) => { setEmailAlertsState(val); localStorage.setItem('settings_emailAlerts', JSON.stringify(val)); };
  const setPushNotifications = (val: boolean) => { setPushNotificationsState(val); localStorage.setItem('settings_pushNotifications', JSON.stringify(val)); };
  const setMarketingEmails = (val: boolean) => { setMarketingEmailsState(val); localStorage.setItem('settings_marketingEmails', JSON.stringify(val)); };
  const setTwoFactorEnabled = (val: boolean) => { setTwoFactorEnabledState(val); localStorage.setItem('settings_2fa', JSON.stringify(val)); };


  // Mock functions for UI interactions
  const toggleSetting = (setter: (val: boolean) => void, value: boolean, label: string) => {
    setter(!value);
  };

  const cycleCurrency = () => {
    const options = ['USD', 'GBP', 'EUR', 'CAD'];
    const nextIndex = (options.indexOf(currency) + 1) % options.length;
    setCurrency(options[nextIndex]);
  };

  const cycleDateFormat = () => {
    const options = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'];
    const nextIndex = (options.indexOf(dateFormat) + 1) % options.length;
    setDateFormat(options[nextIndex]);
  };

  const settingsSections = [
    {
      title: 'Account Information',
      items: [
        { label: 'Name', value: user?.name || 'N/A', icon: '👤', type: 'info' },
        { label: 'Email', value: user?.email || 'N/A', icon: '✉️', type: 'info' },
        { label: 'Role', value: user?.role || 'N/A', icon: '🔑', type: 'info' },
      ],
    },
    {
      title: 'General Preferences',
      items: [
        { label: 'Language', value: 'English (US)', icon: '🌐', type: 'select' },
        { label: 'Currency', value: currency, icon: '💱', type: 'select', action: cycleCurrency },
        { label: 'Date Format', value: dateFormat, icon: '📅', type: 'select', action: cycleDateFormat },
      ],
    },
    {
      title: 'Notifications',
      items: [
        { label: 'Email Alerts', value: emailAlerts, icon: '📧', type: 'toggle', action: () => toggleSetting(setEmailAlerts, emailAlerts, 'Email Alerts') },
        { label: 'Push Notifications', value: pushNotifications, icon: '🔔', type: 'toggle', action: () => toggleSetting(setPushNotifications, pushNotifications, 'Push Notifications') },
        { label: 'Marketing Emails', value: marketingEmails, icon: '📢', type: 'toggle', action: () => toggleSetting(setMarketingEmails, marketingEmails, 'Marketing Emails') },
      ],
    },
    {
      title: 'Subscription & Billing',
      items: [
        { label: 'Current Plan', value: user?.subscription || 'Free Tier', icon: '💳', type: 'info' },
        { label: 'Next Billing', value: 'Jan 1, 2026', icon: '🗓️', type: 'info' },
        {
          label: 'Manage Subscription', value: 'Manage', icon: '↗️', type: 'link', action: () => {
            // Mock opening external portal
            const w = window.open('', '_blank');
            if (w) {
              w.document.write('<h1>Billing Portal Simulation</h1><p>Redirecting to payment provider...</p>');
              setTimeout(() => w.close(), 2000);
            }
            showNotification('Opened billing portal', 'info');
          }
        },
      ],
    },
    {
      title: 'Security',
      items: [
        { label: 'Two-Factor Auth', value: twoFactorEnabled, icon: '🛡️', type: 'toggle', action: () => toggleSetting(setTwoFactorEnabled, twoFactorEnabled, '2FA') },
        { label: 'Change Password', value: 'Update', icon: '🔒', type: 'button', action: () => setShowPasswordForm(true) },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <PageHeader
        title="Settings" />
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
              <View style={styles.themeSelectorContainer}>
                <Text style={styles.themeSelectorLabel}>Display Theme</Text>
                <View style={styles.themeButtonGroup}>
                  {(['light', 'dark', 'auto'] as const).map((mode) => (
                    <TouchableOpacity
                      key={mode}
                      style={[
                        styles.themeButton,
                        themeMode === mode && styles.themeButtonActive
                      ]}
                      onPress={() => setThemeMode(mode)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.themeButtonIcon}>
                        {mode === 'light' ? '☀️' : mode === 'dark' ? '🌙' : '⚙️'}
                      </Text>
                      <Text style={[
                        styles.themeButtonText,
                        themeMode === mode && styles.themeButtonTextActive
                      ]}>
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
          {settingsSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              <View style={styles.sectionContent}>
                {section.items.map((item: any, itemIndex) => (
                  <TouchableOpacity
                    key={itemIndex}
                    style={[
                      styles.infoRow,
                      itemIndex === section.items.length - 1 && styles.infoRowLast,
                      (item.type === 'button' || item.type === 'link' || item.type === 'toggle' || item.type === 'select') ? styles.clickableRow : {}
                    ]}
                    onPress={item.action ? item.action : undefined}
                    activeOpacity={item.action ? 0.7 : 1}
                    disabled={!item.action}
                  >
                    <View style={styles.infoRowLeft}>
                      <View style={styles.infoIconContainer}>
                        <Text style={styles.infoIcon}>{item.icon}</Text>
                      </View>
                      <Text style={styles.infoLabel}>{item.label}</Text>
                    </View>

                    {item.type === 'toggle' ? (
                      <View style={[styles.toggleSwitch, item.value && styles.toggleSwitchActive]}>
                        <View style={[styles.toggleThumb, item.value && styles.toggleThumbActive]} />
                      </View>
                    ) : item.type === 'button' ? (
                      <Text style={styles.actionButtonText}>{item.value}</Text>
                    ) : item.type === 'link' ? (
                      <Text style={styles.linkText}>{item.value}</Text>
                    ) : (
                      <Text style={styles.infoValue} numberOfLines={1}>
                        {item.value.toString()}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {/* Danger Zone */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: 'var(--danger)' }]}>Danger Zone</Text>
            </View>
            <View style={[styles.sectionContent, { borderColor: 'var(--danger-border)' }]}>
              <TouchableOpacity
                style={styles.dangerRow}
                onPress={() => Alert.alert('Delete Account', 'This action is permanent and cannot be undone. Please confirm.', [{ text: 'Cancel', style: 'cancel' }, { text: 'Delete', style: 'destructive', onPress: () => showNotification('Account deletion request queued.', 'info') }])}
              >
                <Text style={styles.dangerText}>Delete Account</Text>
                <Text style={styles.dangerIcon}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Password Change Modal / Overlay */}
          {showPasswordForm && (
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Change Password</Text>

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
                      <Text style={styles.cancelButtonText}>Cancel</Text>
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
              </View>
            </View>
          )}

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
    backgroundColor: 'var(--glass-bg)',
    //@ts-ignore
    backdropFilter: 'blur(16px)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'var(--glass-border)',
    boxShadow: 'var(--shadow-sm)',
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'var(--border-subtle)',
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
    backgroundColor: 'var(--slate-100)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    boxShadow: 'none',
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
    borderColor: 'var(--border-subtle)',
    borderRadius: 16,
    backgroundColor: 'var(--bg-app)',
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
    backgroundColor: 'var(--bg-surface)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'var(--border-subtle)',
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
    //@ts-ignore
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
    backgroundColor: 'var(--bg-surface)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    boxShadow: 'var(--shadow-sm)',
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
  themeSelectorContainer: {
    padding: 20,
  },
  themeSelectorLabel: {
    fontSize: 16,
    color: 'var(--text-secondary)',
    fontWeight: '600',
    marginBottom: 16,
  },
  themeButtonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  themeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'var(--bg-app)',
    borderWidth: 1,
    borderColor: 'var(--border-subtle)',
    gap: 8,
    transition: 'all 0.2s ease',
  },
  themeButtonActive: {
    backgroundColor: 'var(--primary)',
    borderColor: 'var(--primary)',
    boxShadow: '0 4px 12px hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.2)',
  },
  themeButtonIcon: {
    fontSize: 16,
  },
  themeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  themeButtonTextActive: {
    color: '#ffffff',
  },
  // Deprecated Toggle Styles retained if needed elsewhere, otherwise safe to ignore
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'var(--bg-app)',
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
  clickableRow: {
    cursor: 'pointer',
  },
  actionButtonText: {
    color: 'var(--primary)',
    fontWeight: '600',
    fontSize: 14,
  },
  linkText: {
    color: 'var(--primary)',
    fontWeight: '600',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  dangerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    cursor: 'pointer',
  },
  dangerText: {
    color: 'var(--danger)',
    fontWeight: '700',
    fontSize: 16,
  },
  dangerIcon: {
    fontSize: 18,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    //@ts-ignore
    backdropFilter: 'blur(8px)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'var(--glass-bg)',
    //@ts-ignore
    backdropFilter: 'blur(24px)',
    borderRadius: 24,
    width: '100%',
    maxWidth: 500,
    padding: 24,
    boxShadow: 'var(--shadow-lg)',
    borderWidth: 1,
    borderColor: 'var(--glass-border)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: 24,
    textAlign: 'center',
  }
});

export default SettingsScreen;
