/**
 * SIGN IN SCREEN
 * Handles user authentication.
 * Uses `useAuth` context to call the `signIn` function.
 * displays a styled form with specific attention to "Premium" aesthetics (gradients, glassmorphism).
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert('Sign In Failed', error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundDecoration}>
        <View style={[styles.decorativeCircle, styles.circle1]} />
        <View style={[styles.decorativeCircle, styles.circle2]} />
        <View style={[styles.decorativeCircle, styles.circle3]} />
        <View style={[styles.decorativeCircle, styles.circle4]} />
      </View>

      <View style={[styles.form, { shadowOpacity: 0 }]}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIconContainer}>
            <Text style={styles.logoIcon}>🏠</Text>
          </View>
          <Text style={styles.title}>LandlordLens</Text>
          <Text style={styles.tagline}>Property Management Made Simple</Text>
        </View>

        <View style={styles.welcomeSection}>
          <Text style={styles.subtitle}>Welcome back</Text>
          <Text style={styles.description}>Sign in to continue to your dashboard</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>✉️</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor="#94a3b8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#94a3b8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
              activeOpacity={0.6}
            >
              <Text style={styles.eyeIconText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignIn}
          disabled={loading}
          activeOpacity={0.9}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Text>
            {!loading && <Text style={styles.buttonArrow}>→</Text>}
          </View>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity onPress={() => navigate('/auth/register')} style={styles.linkButton} activeOpacity={0.7}>
          <Text style={styles.linkText}>
            Don&apos;t have an account? <Text style={styles.linkTextBold}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'var(--bg-gradient)',
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
    minHeight: '100%',
  },
  backgroundDecoration: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 9999,
  },
  circle1: {
    width: 600,
    height: 600,
    backgroundColor: 'hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.05)',
    top: -250,
    right: -250,
  },
  circle2: {
    width: 500,
    height: 500,
    backgroundColor: 'hsla(var(--secondary-h), var(--secondary-s), var(--secondary-l), 0.05)',
    bottom: -200,
    left: -200,
  },
  circle3: {
    width: 400,
    height: 400,
    backgroundColor: 'hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.03)',
    top: '30%',
    right: -150,
  },
  circle4: {
    width: 300,
    height: 300,
    backgroundColor: 'hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.04)',
    bottom: '20%',
    left: -100,
  },
  form: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    //@ts-ignore - web only
    backdropFilter: 'blur(20px)',
    padding: 48,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 1,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.06)',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 44,
  },
  logoIconContainer: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.04)',
  },
  logoIcon: {
    fontSize: 44,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: 'var(--text-primary)',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 15,
    color: 'var(--text-secondary)',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  welcomeSection: {
    marginBottom: 40,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 26,
    color: 'var(--text-primary)',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    color: 'var(--text-secondary)',
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'var(--text-primary)',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'var(--gray-200)',
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 16,
    minHeight: 56,
    transition: 'all 0.2s ease',
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 12,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'var(--text-primary)',
    paddingVertical: 14,
    fontWeight: '400',
  },
  eyeIcon: {
    padding: 8,
  },
  eyeIconText: {
    fontSize: 18,
    opacity: 0.6,
  },
  button: {
    backgroundColor: 'var(--primary)',
    backgroundImage: 'var(--primary-gradient)',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 12,
    boxShadow: '0 10px 20px hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.25)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  buttonDisabled: {
    opacity: 0.5,
    boxShadow: 'none',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonArrow: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'var(--gray-200)',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: 'var(--text-tertiary)',
    fontWeight: '500',
  },
  linkButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  linkText: {
    color: 'var(--text-secondary)',
    fontSize: 14,
  },
  linkTextBold: {
    color: 'var(--primary)',
    fontWeight: '700',
  },
});

export default SignInScreen;
