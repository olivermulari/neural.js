import { Network } from "../network"
import { SGD } from "./SGD";

/**
 * Optimizer
 */
export class Optimizer {
  /**
   * Trains with stochastic gradient descend
   */
  static stochasticGradientDescend = (network: Network) => {
    return new SGD(network);
  }
}