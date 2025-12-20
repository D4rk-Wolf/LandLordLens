import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

interface SignInScreenProps {
  onNavigateToSignUp: () => void;
}

const SignInScreen: React.FC<SignInScreenProps> = ({ onNavigateToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();

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
      
      <View style={styles.form}>
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
              placeholderTextColor="#9ca3af"
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
              placeholderTextColor="#9ca3af"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.eyeIconText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignIn}
          disabled={loading}
          activeOpacity={0.85}
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

        <TouchableOpacity onPress={onNavigateToSignUp} style={styles.linkButton}>
          <Text style={styles.linkText}>
            Don't have an account? <Text style={styles.linkTextBold}>Sign Up</Text>
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
    backgroundColor: '#f9fafb',
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
    minHeight: '100vh',
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
    opacity: 0.08,
  },
  circle1: {
    width: 500,
    height: 500,
    backgroundColor: '#6366f1',
    top: -200,
    right: -200,
  },
  circle2: {
    width: 400,
    height: 400,
    backgroundColor: '#8b5cf6',
    bottom: -150,
    left: -150,
  },
  circle3: {
    width: 300,
    height: 300,
    backgroundColor: '#ec4899',
    top: '40%',
    right: -100,
  },
  circle4: {
    width: 250,
    height: 250,
    backgroundColor: '#3b82f6',
    top: '60%',
    left: -80,
  },
  form: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#ffffff',
    padding: 48,
    borderRadius: 28,
    boxShadow: '0px 20px 30px 0px rgba(0, 0, 0, 0.12)',
    elevation: 15,
    zIndex: 1,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#e0e7ff',
    boxShadow: '0px 8px 16px 0px rgba(99, 102, 241, 0.2)',
    elevation: 4,
  },
  logoIcon: {
    fontSize: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: -1.5,
    lineHeight: 44,
  },
  tagline: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  welcomeSection: {
    marginBottom: 36,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 28,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '700',
    letterSpacing: -0.5,
    lineHeight: 36,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 14,
    backgroundColor: '#ffffff',
    paddingHorizontal: 18,
    minHeight: 56,
    transition: 'all 0.2s ease',
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 14,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 16,
    fontWeight: '400',
  },
  eyeIcon: {
    padding: 6,
    borderRadius: 8,
  },
  eyeIconText: {
    fontSize: 20,
  },
  button: {
    backgroundColor: '#6366f1',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 12,
    boxShadow: '0px 8px 16px 0px rgba(99, 102, 241, 0.35)',
    elevation: 6,
    borderWidth: 0,
  },
  buttonDisabled: {
    backgroundColor: '#d1d5db',
    shadowOpacity: 0,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonArrow: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    marginHorizontal: 20,
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  linkButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  linkText: {
    color: '#6b7280',
    fontSize: 15,
    fontWeight: '400',
  },
  linkTextBold: {
    color: '#6366f1',
    fontWeight: '700',
  },
});

export default SignInScreen;
