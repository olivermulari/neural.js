/**
 * Squared error
 * C = (a - y)^2
 */
const SQE = (a: number, y: number) => {
  return (a - y) * (a - y);
}

/**
 * sum of the squared errors
 */
export const SSE = (output: number[], desired: number[]) => {
  return output.reduce((l, r, i) => l + SQE(r, desired[i]), 0);
}

/**
 * mean squared error
 */
 export const MSE = (output: number[], desired: number[]) => {
  return SSE(output, desired) / output.length;
}
