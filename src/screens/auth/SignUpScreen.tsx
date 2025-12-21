import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

interface SignUpScreenProps {
  onNavigateToSignIn: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onNavigateToSignIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, name);
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message || 'An error occurred');
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.tagline}>Join LandlordLens Today</Text>
        </View>

        <Text style={styles.subtitle}>Start Managing Your Properties</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>👤</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor="#94a3b8"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>
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
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={styles.input}
              placeholder="Minimum 6 characters"
              placeholderTextColor="#94a3b8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>🛡️</Text>
            <TextInput
              style={styles.input}
              placeholder="Re-enter your password"
              placeholderTextColor="#94a3b8"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignUp}
          disabled={loading}
          activeOpacity={0.9}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>{loading ? 'Creating Account...' : 'Create Account'}</Text>
            {!loading && <Text style={styles.buttonArrow}>→</Text>}
          </View>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity onPress={onNavigateToSignIn} style={styles.linkButton} activeOpacity={0.7}>
          <Text style={styles.linkText}>Already have an account? <Text style={styles.linkTextBold}>Sign In</Text></Text>
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
    maxWidth: 540,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    //@ts-ignore - web only
    backdropFilter: 'blur(20px)',
    padding: 48,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 1,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.06)',
    marginVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.04)',
  },
  logoIcon: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
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
  subtitle: {
    fontSize: 18,
    color: 'var(--text-primary)',
    textAlign: 'center',
    marginBottom: 36,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  inputContainer: {
    marginBottom: 20,
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
    minHeight: 52,
    transition: 'all 0.2s ease',
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 12,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: 'var(--text-primary)',
    paddingVertical: 12,
    fontWeight: '400',
  },
  button: {
    backgroundColor: 'var(--primary)',
    backgroundImage: 'var(--primary-gradient)',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
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
    marginVertical: 28,
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

export default SignUpScreen;
