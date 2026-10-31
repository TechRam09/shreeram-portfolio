import { describe, expect, it } from 'vitest';
import { buildThreadPath, progressFractionAt } from '../src/lib/thread';

const NODES = [
  { x: 100, y: 0 },
  { x: 150, y: 200 },
  { x: 120, y: 400 },
  { x: 200, y: 600 }
];

describe('buildThreadPath', () => {
  it('starts with a move to the first node', () => {
    const d = buildThreadPath(NODES);
    expect(d.startsWith('M 100.0 0.0')).toBe(true);
  });

  it('passes through every node (spline knots)', () => {
    const d = buildThreadPath(NODES);
    for (const { x, y } of NODES.slice(1)) {
      expect(d).toContain(`${x.toFixed(1)} ${y.toFixed(1)}`);
    }
  });

  it('returns an empty path for fewer than two nodes', () => {
    expect(buildThreadPath([])).toBe('');
    expect(buildThreadPath([{ x: 1, y: 2 }])).toBe('');
  });
});

describe('progressFractionAt', () => {
  const samples = [
    { x: 0, y: 0, len: 0 },
    { x: 0, y: 100, len: 100 },
    { x: 0, y: 300, len: 250 },
    { x: 0, y: 500, len: 400 }
  ];
  const total = 400;

  it('is 0 above the thread start', () => {
    expect(progressFractionAt(-50, samples, total)).toBe(0);
  });

  it('is 1 past the thread end', () => {
    expect(progressFractionAt(900, samples, total)).toBe(1);
  });

  it('interpolates between samples proportionally to arc length', () => {
    // target 200 → halfway between len 100 and len 250 → frac 175/400
    expect(progressFractionAt(200, samples, total)).toBeCloseTo(175 / 400, 5);
  });

  it('never leaves 0..1', () => {
    for (const y of [-100, 0, 150, 250, 400, 800]) {
      const f = progressFractionAt(y, samples, total);
      expect(f).toBeGreaterThanOrEqual(0);
      expect(f).toBeLessThanOrEqual(1);
    }
  });
});
