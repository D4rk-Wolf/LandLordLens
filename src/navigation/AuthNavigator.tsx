import React from 'react';
import { View, StyleSheet } from 'react-native';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import TenantInviteScreen from '../screens/auth/TenantInviteScreen';

interface AuthNavigatorProps {
  initialScreen?: 'signin' | 'signup' | 'tenant-invite';
}

const AuthNavigator: React.FC<AuthNavigatorProps> = ({ initialScreen = 'signin' }) => {
  const [currentScreen, setCurrentScreen] = React.useState(initialScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'signin':
        return <SignInScreen onNavigateToSignUp={() => setCurrentScreen('signup')} />;
      case 'signup':
        return <SignUpScreen onNavigateToSignIn={() => setCurrentScreen('signin')} />;
      case 'tenant-invite':
        return <TenantInviteScreen />;
      default:
        return <SignInScreen onNavigateToSignUp={() => setCurrentScreen('signup')} />;
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

export default AuthNavigator;
