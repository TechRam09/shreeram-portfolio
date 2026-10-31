// Thread geometry helpers shared by the hero-to-footer spline and the
// scroll-tracked glow. Pure functions — unit tested in tests/thread.test.js.

// Catmull-Rom-style spline through every story node (passes through points).
export function buildThreadPath(points) {
  if (points.length < 2) return '';
  const point = (x, y) => `${x.toFixed(1)} ${y.toFixed(1)}`;
  let path = `M ${point(points[0].x, points[0].y)}`;
  for (let index = 0; index < points.length - 1; index += 1) {
    const before = points[index - 1] || points[index];
    const start = points[index];
    const end = points[index + 1];
    const after = points[index + 2] || end;
    const controlOne = { x: start.x + (end.x - before.x) / 6, y: start.y + (end.y - before.y) / 6 };
    const controlTwo = { x: end.x - (after.x - start.x) / 6, y: end.y - (after.y - start.y) / 6 };
    path += ` C ${point(controlOne.x, controlOne.y)}, ${point(controlTwo.x, controlTwo.y)}, ${point(end.x, end.y)}`;
  }
  return path;
}

// Where the glow tip sits for a given viewport line: the arc position whose
// sampled height matches targetY, interpolated between arc samples.
export function progressFractionAt(targetY, samples, total) {
  if (!samples || !samples.length) return 1;
  if (targetY <= samples[0].y) return 0;
  for (let i = 1; i < samples.length; i++) {
    if (samples[i].y >= targetY) {
      const t = (targetY - samples[i - 1].y) / Math.max(1e-6, samples[i].y - samples[i - 1].y);
      return Math.min(1, Math.max(0, (samples[i - 1].len + (samples[i].len - samples[i - 1].len) * t) / total));
    }
  }
  return 1;
}
