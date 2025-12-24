import React from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';

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
  disabled?: boolean;
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
  disabled = false,
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
          multiline && styles.inputMultiline,
          error && styles.inputError,
          disabled && styles.inputDisabled,
          inputStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="var(--slate-400)"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={!disabled}
        // @ts-ignore
        className="input-saas" // Applies web-specific focus strings from index.css
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: 'var(--slate-700)',
    marginBottom: 6,
    fontFamily: 'var(--font-sans)',
  },
  required: {
    color: 'var(--danger-text)',
  },
  input: {
    borderWidth: 1,
    borderColor: 'var(--slate-300)',
    borderRadius: 6, // Radius-md
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    color: 'var(--slate-900)',
    fontFamily: 'var(--font-sans)',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: 'var(--danger-border)',
  },
  inputDisabled: {
    backgroundColor: 'var(--slate-50)',
    color: 'var(--slate-500)',
  },
  errorText: {
    fontSize: 12,
    color: 'var(--danger-text)',
    marginTop: 4,
    fontWeight: '500',
  },
});

export default FormField;
