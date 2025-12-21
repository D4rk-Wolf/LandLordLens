import { useState, useCallback } from 'react';
import { ValidationRule } from '../utils/validation';

export interface FormField<T> {
    value: T;
    error?: string;
    touched: boolean;
}

export interface UseFormOptions<T> {
    initialValues: T;
    validationRules?: Partial<Record<keyof T, ValidationRule>>;
    onSubmit?: (values: T) => void | Promise<void>;
}

export interface UseFormReturn<T> {
    values: T;
    errors: Partial<Record<keyof T, string>>;
    touched: Partial<Record<keyof T, boolean>>;
    isSubmitting: boolean;
    isValid: boolean;
    setValue: (field: keyof T, value: any) => void;
    setError: (field: keyof T, error: string) => void;
    setTouched: (field: keyof T, touched: boolean) => void;
    handleChange: (field: keyof T) => (value: any) => void;
    handleBlur: (field: keyof T) => () => void;
    validateField: (field: keyof T) => string | undefined;
    validateForm: () => boolean;
    handleSubmit: (e?: any) => Promise<void>;
    reset: () => void;
}

export const useForm = <T extends Record<string, any>>({
    initialValues,
    validationRules = {},
    onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> => {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [touched, setTouchedState] = useState<Partial<Record<keyof T, boolean>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateField = useCallback((field: keyof T): string | undefined => {
        const rule = validationRules[field];
        if (!rule) return undefined;

        const error = rule(values[field], values);
        return error;
    }, [values, validationRules]);

    const validateForm = useCallback((): boolean => {
        const newErrors: Partial<Record<keyof T, string>> = {};
        let isValid = true;

        (Object.keys(validationRules) as Array<keyof T>).forEach(field => {
            const error = validateField(field);
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    }, [validateField, validationRules]);

    const setValue = useCallback((field: keyof T, value: any) => {
        setValues(prev => ({ ...prev, [field]: value }));

        // Clear error when value changes
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    }, [errors]);

    const setError = useCallback((field: keyof T, error: string) => {
        setErrors(prev => ({ ...prev, [field]: error }));
    }, []);

    const setTouched = useCallback((field: keyof T, isTouched: boolean) => {
        setTouchedState(prev => ({ ...prev, [field]: isTouched }));
    }, []);

    const handleChange = useCallback((field: keyof T) => (value: any) => {
        setValue(field, value);
    }, [setValue]);

    const handleBlur = useCallback((field: keyof T) => () => {
        setTouched(field, true);
        const error = validateField(field);
        if (error) {
            setError(field, error);
        }
    }, [validateField, setTouched, setError]);

    const handleSubmit = useCallback(async (e?: any) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        // Mark all fields as touched
        const allTouched: Partial<Record<keyof T, boolean>> = {};
        (Object.keys(values) as Array<keyof T>).forEach(key => {
            allTouched[key] = true;
        });
        setTouchedState(allTouched);

        // Validate
        const isValid = validateForm();
        if (!isValid) {
            return;
        }

        if (onSubmit) {
            setIsSubmitting(true);
            try {
                await onSubmit(values);
            } catch (error) {
                console.error('Form submission error:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    }, [values, validateForm, onSubmit]);

    const reset = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouchedState({});
        setIsSubmitting(false);
    }, [initialValues]);

    const isValid = Object.keys(errors).length === 0;

    return {
        values,
        errors,
        touched,
        isSubmitting,
        isValid,
        setValue,
        setError,
        setTouched,
        handleChange,
        handleBlur,
        validateField,
        validateForm,
        handleSubmit,
        reset,
    };
};
