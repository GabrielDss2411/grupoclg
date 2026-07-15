import { describe, it, expect } from 'vitest';

describe('vitest runner smoke test', () => {
  it('runs a trivial assertion', () => {
    expect(1 + 1).toBe(2);
  });
});
