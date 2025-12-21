// Form validation utilities

export type ValidationRule<T = any> = (value: T, allValues?: any) => string | undefined;

export interface ValidationRules<T> {
    [K: string]: ValidationRule;
}

// Common validators
export const validators = {
    required: (message = 'This field is required'): ValidationRule => (value: any) => {
        if (value === null || value === undefined || value === '') {
            return message;
        }
        if (typeof value === 'string' && value.trim() === '') {
            return message;
        }
        return undefined;
    },

    email: (message = 'Invalid email address'): ValidationRule<string> => (value: string) => {
        if (!value) return undefined;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? undefined : message;
    },

    minLength: (min: number, message?: string): ValidationRule<string> => (value: string) => {
        if (!value) return undefined;
        return value.length >= min ? undefined : message || `Minimum ${min} characters required`;
    },

    maxLength: (max: number, message?: string): ValidationRule<string> => (value: string) => {
        if (!value) return undefined;
        return value.length <= max ? undefined : message || `Maximum ${max} characters allowed`;
    },

    min: (min: number, message?: string): ValidationRule<number> => (value: number) => {
        if (value === null || value === undefined) return undefined;
        return value >= min ? undefined : message || `Minimum value is ${min}`;
    },

    max: (max: number, message?: string): ValidationRule<number> => (value: number) => {
        if (value === null || value === undefined) return undefined;
        return value <= max ? undefined : message || `Maximum value is ${max}`;
    },

    pattern: (regex: RegExp, message = 'Invalid format'): ValidationRule<string> => (value: string) => {
        if (!value) return undefined;
        return regex.test(value) ? undefined : message;
    },

    phone: (message = 'Invalid phone number'): ValidationRule<string> => (value: string) => {
        if (!value) return undefined;
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10 ? undefined : message;
    },

    url: (message = 'Invalid URL'): ValidationRule<string> => (value: string) => {
        if (!value) return undefined;
        try {
            new URL(value);
            return undefined;
        } catch {
            return message;
        }
    },

    postcode: (message = 'Invalid postcode'): ValidationRule<string> => (value: string) => {
        if (!value) return undefined;
        // UK postcode regex
        const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
        return postcodeRegex.test(value) ? undefined : message;
    },

    match: (otherField: string, message = 'Fields do not match'): ValidationRule => (value: any, allValues?: any) => {
        if (!allValues) return undefined;
        return value === allValues[otherField] ? undefined : message;
    },

    custom: (validator: (value: any) => boolean, message: string): ValidationRule => (value: any) => {
        return validator(value) ? undefined : message;
    },
};

// Combine multiple validators
export const composeValidators = (...validators: ValidationRule[]): ValidationRule => (value: any, allValues?: any) => {
    for (const validator of validators) {
        const error = validator(value, allValues);
        if (error) return error;
    }
    return undefined;
};
