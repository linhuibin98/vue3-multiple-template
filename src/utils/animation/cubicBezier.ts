export function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  const ZERO_LIMIT = 1e-6
  const ax = 3 * p1x - 3 * p2x + 1
  const bx = 3 * p2x - 6 * p1x
  const cx = 3 * p1x

  const ay = 3 * p1y - 3 * p2y + 1
  const by = 3 * p2y - 6 * p1y
  const cy = 3 * p1y

  function sampleCurveDerivativeX(t: number) {
    return (3 * ax * t + 2 * bx) * t + cx
  }

  function sampleCurveX(t: number) {
    return ((ax * t + bx) * t + cx) * t
  }

  function sampleCurveY(t: number) {
    return ((ay * t + by) * t + cy) * t
  }

  function solveCurveX(x: number) {
    let t2 = x;
    let derivative;
    let x2;
    for (let i = 0; i < 8; i++) {
      x2 = sampleCurveX(t2) - x
      if (Math.abs(x2) < ZERO_LIMIT) {
        return t2
      }
      derivative = sampleCurveDerivativeX(t2)
      if (Math.abs(derivative) < ZERO_LIMIT) {
        break
      }
      t2 -= x2 / derivative
    }
    let t1 = 1;
    let t0 = 0;
    t2 = x
    while (t1 > t0) {
      x2 = sampleCurveX(t2) - x
      if (Math.abs(x2) < ZERO_LIMIT) {
        return t2
      }
      if (x2 > 0) {
        t1 = t2;
      } else {
        t0 = t2
      }
      t2 = (t1 + t0) / 2
    }
    return t2
  }

  function solve(x: number) {
    return sampleCurveY(solveCurveX(x))
  }

  return solve
}

export const ease = cubicBezier(.25, .1, .25, 1)
export const easeIn = cubicBezier(.42, 0, 1, 1)
export const easeOut = cubicBezier(0, 0, .58, 1)
export const easeInOut = cubicBezier(.42, 0, .58, 1)
export const liner = cubicBezier(0, 0, 1, 1)