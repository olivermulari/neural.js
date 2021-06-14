import { Activation } from "../functions/activation";
import { Network } from "../network";

const dot = (a: number[], b: number[]) => {
  if (a.length !== b.length) {
    throw new Error("Dot product: vectors do not have the same length")
  }
  let result = 0;
  for (let i = 0; i < a.length; ++i) {
    result += a[i] * b[i];
  }
  return result;
}

export class AbstractLayer {
  network?: Network;
  size: number;
  weights: number[][];
  bias: number[];
  activation: number[];

  constructor(size: number) {
    this.network;
    this.size = size;
    this.weights = [];
    this.bias = [];
    this.activation = [];
  }

  initWeightsAndBiases(previousLayer: AbstractLayer) {
    this.weights = [];
    this.bias = [];
    // weights
    for (let i1 = 0; i1 < this.size; ++i1) {
      const weights = []
      for (let i2 = 0; i2 < previousLayer.size; ++i2) {
        weights.push(Math.random() - 1)
      }
      this.weights.push(weights)
    }
    // biases
    for (let i = 0; i < this.size; ++i) {
      this.bias.push(Math.random() - 1)
      this.activation.push(0)
    }
  }

  forwards(input: number[]) {
    for (let i = 0; i < this.size; ++i) {
      const z = dot(input, this.weights[i]) + this.bias[i];
      this.activation[i] = Activation.sigmoid(z);
    }
    return this.activation;
  }
}
