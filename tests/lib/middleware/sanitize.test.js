/**
 * Unit tests for input sanitization middleware
 */

const { sanitizeString, sanitizeObject } = require('../../../lib/middleware/sanitize');

describe('Input Sanitization', () => {
  describe('sanitizeString', () => {
    test('should remove HTML tags', () => {
      const input = '<script>alert("xss")</script>Hello';
      const result = sanitizeString(input);
      expect(result).toBe('alert("xss")Hello');
      expect(result).not.toContain('<script>');
      expect(result).not.toContain('</script>');
    });

    test('should remove dangerous characters', () => {
      const input = 'Hello<>"\'World';
      const result = sanitizeString(input);
      expect(result).toBe('Hello"\'World');
    });

    test('should trim whitespace', () => {
      const input = '  Hello World  ';
      const result = sanitizeString(input);
      expect(result).toBe('Hello World');
    });

    test('should handle empty strings', () => {
      expect(sanitizeString('')).toBe('');
    });

    test('should handle non-string inputs', () => {
      expect(sanitizeString(123)).toBe(123);
      expect(sanitizeString(null)).toBe(null);
      expect(sanitizeString(undefined)).toBe(undefined);
    });
  });

  describe('sanitizeObject', () => {
    test('should sanitize nested objects', () => {
      const input = {
        name: '<script>alert("xss")</script>John',
        email: '  user@example.com  ',
        nested: {
          value: 'Hello<>World',
        },
      };
      const result = sanitizeObject(input);
      expect(result.name).toBe('alert("xss")John');
      expect(result.email).toBe('user@example.com');
      expect(result.nested.value).toBe('HelloWorld');
    });

    test('should sanitize arrays', () => {
      const input = ['<script>test</script>', '  hello  ', 'world<>'];
      const result = sanitizeObject(input);
      expect(result[0]).toBe('test');
      expect(result[1]).toBe('hello');
      expect(result[2]).toBe('world');
    });

    test('should handle null and undefined', () => {
      expect(sanitizeObject(null)).toBe(null);
      expect(sanitizeObject(undefined)).toBe(undefined);
    });

    test('should preserve non-string values', () => {
      const input = {
        number: 123,
        boolean: true,
        nullValue: null,
      };
      const result = sanitizeObject(input);
      expect(result.number).toBe(123);
      expect(result.boolean).toBe(true);
      expect(result.nullValue).toBe(null);
    });
  });
});
