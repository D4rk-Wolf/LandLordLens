import React from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
  required?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  error,
  required = false,
  style,
  inputStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          multiline && styles.inputMultiline,
          inputStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: 'var(--text-primary)',
    marginBottom: 10,
    marginLeft: 4,
  },
  required: {
    color: 'var(--danger)',
  },
  input: {
    borderWidth: 1.5,
    borderColor: 'var(--gray-200)',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    color: 'var(--text-primary)',
    //@ts-ignore - web only
    transition: 'all 0.2s ease',
  },
  inputError: {
    borderColor: 'var(--danger)',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  inputMultiline: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: 13,
    color: 'var(--danger)',
    marginTop: 6,
    marginLeft: 4,
    fontWeight: '500',
  },
});

export default FormField;
