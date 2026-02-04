import { describe, it, expect } from 'vitest';
import validateDate from './validateDate';
import validateGuid from './validateGuid';
import validateIPV6 from './validateIPV6';

describe('validators', () => {
  describe('validateDate', () => {
    it('parses valid french date dd/mm/yyyy', () => {
      const d = validateDate('01/02/2020');
      expect(d).not.toBeNull();
      expect(d?.getFullYear()).toBe(2020);
      expect(d?.getMonth()).toBe(1);
      expect(d?.getDate()).toBe(1);
    });

    it('handles 2-digit years', () => {
      const d = validateDate('1-1-21');
      expect(d).not.toBeNull();
      expect(d?.getFullYear()).toBe(2021);
    });

    it('returns null for invalid date', () => {
      expect(validateDate('31/02/2020')).toBeNull();
    });
  });

  describe('validateGuid', () => {
    it('accepts D format', () => {
      expect(validateGuid('00000000-0000-0000-0000-000000000000')).toBe(true);
    });

    it('accepts N format', () => {
      expect(validateGuid('00000000000000000000000000000000')).toBe(true);
    });

    it('rejects invalid', () => {
      expect(validateGuid('not-a-guid')).toBe(false);
    });
  });

  describe('validateIPV6', () => {
    it('accepts full form', () => {
      expect(validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
    });

    it('accepts compressed ::1', () => {
      expect(validateIPV6('::1')).toBe(true);
    });

    it('accepts IPv4-embedded', () => {
      expect(validateIPV6('::ffff:192.0.2.128')).toBe(true);
    });

    it('rejects invalid', () => {
      expect(validateIPV6('2001:::1')).toBe(false);
    });
  });
});
