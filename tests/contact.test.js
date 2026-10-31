import { describe, expect, it } from 'vitest';
import { validateContactForm } from '../src/lib/contact';

const valid = { name: 'Shreeram', email: 'test@example.com', message: 'Hi!' };

describe('validateContactForm', () => {
  it('accepts a complete form', () => {
    expect(validateContactForm(valid)).toBe('');
  });

  it('rejects missing fields', () => {
    expect(validateContactForm({ ...valid, name: '  ' })).toContain('Please add');
    expect(validateContactForm({ ...valid, message: '' })).toContain('Please add');
  });

  it('rejects malformed emails', () => {
    expect(validateContactForm({ ...valid, email: 'not-an-email' })).toContain('Please add');
  });
});
