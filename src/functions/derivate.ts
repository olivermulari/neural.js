/**
 * derivates of activation functions
 * takes in the activation value and returns it's derivate
 */
 export class Derivate {
  /**
   * Sigmoid
   */
  static sigmoid = (out: number) => {
    return out * (1 - out);
  }
}
