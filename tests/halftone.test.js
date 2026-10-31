import { describe, expect, it } from 'vitest';
import { hwfHex, hwfFitSize, hwfRadius, hwfStep, hwfWarmth } from '../src/components/HalftoneWordmarkFooter';

describe('hwfHex', () => {
  it('parses hex colors', () => {
    expect(hwfHex('#abc')).toEqual([170, 187, 204]);
    expect(hwfHex('#aabbcc')).toEqual([170, 187, 204]);
  });
  it('returns null for non-colors', () => {
    expect(hwfHex('nope')).toBe(null);
    expect(hwfHex('')).toBe(null);
  });
});

describe('hwfRadius', () => {
  it('scales with the square root of coverage (area-true)', () => {
    expect(hwfRadius(1, 10)).toBeCloseTo(5.6, 5);
    expect(hwfRadius(0, 10)).toBe(0);
    expect(hwfRadius(0.25, 10) / hwfRadius(1, 10)).toBeCloseTo(0.5, 5);
  });
});

describe('hwfWarmth', () => {
  it('is cold at home and clamps at 1', () => {
    expect(hwfWarmth(0, 0, 0, 0, 10)).toBe(0);
    expect(hwfWarmth(100, 0, 0, 0, 10)).toBe(1);
  });
});

describe('hwfFitSize', () => {
  it('scales measured width to the target', () => {
    expect(hwfFitSize(100, 200)).toBe(200);
    expect(hwfFitSize(0, 200)).toBe(0);
  });
});

describe('hwfStep', () => {
  const home = { x: 0, y: 0, vx: 0, vy: 0, hx: 0, hy: 0 };
  it('keeps a resting dot at home when the pointer is far away', () => {
    const [x, y, vx, vy] = hwfStep(0, 0, 0, 0, 0, 0, 1e6, 1e6, 80);
    expect([x, y, vx, vy]).toEqual([0, 0, 0, 0]);
  });
  it('pushes a dot away from the pointer and springs it back', () => {
    const [x, y, vx, vy] = hwfStep(10, 0, 0, 0, 0, 0, 0, 0, 80);
    expect(x).toBeGreaterThan(0);
    expect(vx).toBeGreaterThan(0);
  });
});
