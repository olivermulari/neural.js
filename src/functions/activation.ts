/**
 * Functions that output [0, 1]
 * Unlinearity in neural networks
 */
export class Activation {
  /**
   * Sigmoid
   */
  static sigmoid = (z: number) => {
    return 1 / (1 + Math.pow(Math.E, -z))
  }
}
