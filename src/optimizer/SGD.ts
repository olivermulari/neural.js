import { ITrainData } from "../data";
import { MSE } from "../functions/cost";
import { Derivate } from "../functions/derivate";
import { InputLayer } from "../layers/InputLayer";
import { OutputLayer } from "../layers/OutputLayer";
import { Network } from "../network";

/**
 * Stochastic Gardient Descend (SGD)
 */
export class SGD {
  net: Network;
  deltas: number[][];
  // changes_weight: number[][][];
  // changes_bias: number[][];

  constructor(network: Network) {
    this.net = network;
    this.deltas = [];
    // this.changes_weight = [];
    // this.changes_bias = [];
    this.init()
  }

  /**
   * initializes
   */
  init() {
    // this.changes_bias = [];
    // this.changes_weight = [];
    this.deltas = [];
    this.net.layers.forEach((layer) => {
      this.deltas.push(new Array(layer.size).fill(0))
      // if (layer instanceof InputLayer) {
      //   this.changes_bias.push([])
      //   this.changes_weight.push([])
      // } else {
      //   this.changes_bias.push(new Array(layer.size).fill(0))
      //   this.changes_weight.push(new Array(layer.size).fill(new Array(layer.weights[0].length).fill(0)))
      // }
    })
  }

  train(data: ITrainData[], iteration: number) {
    const layers = this.net.layers;
    const options = this.net.options;

    // error
    let mean_squared_error = 0
    // run batch
    for (let data_i = 0; data_i < data.length; ++data_i) {
      // forward pass
      let activationRef = data[data_i].input;
      layers.forEach((layer) => {
        activationRef = layer.forwards(activationRef)
      })
      const output = activationRef;
      const target = data[data_i].output;

      // error
      mean_squared_error += MSE(output, target)

      // backpropagate
      for (let layer_i = layers.length - 1; layer_i >= 0; --layer_i) {
        const layer = layers[layer_i];
        // check layer
        if (layer instanceof InputLayer) {
          // pass
        } else {
          const previous = layers[layer_i - 1];
          for (let i1 = 0; i1 < layer.size; ++i1) {
            // calculate effect to error
            let effect_to_error = 0;
            if (layer instanceof OutputLayer) {
              effect_to_error = -1 * (target[i1] - output[i1]);
            } else {
              const next = layers[layer_i + 1];
              // calculate nodes effect to total error (effect to next layer)
              for (let i2 = 0; i2 < next.size; ++i2) {
                const nextWeight = next.weights[i2][i1]; // inverted indices!
                const nextError = this.deltas[layer_i + 1][i2]
                effect_to_error += nextWeight * nextError;
              }
            }
            const currentActivation = layer.activation[i1];
            // deltas
            const dEdO = effect_to_error;
            const dOdN = Derivate.sigmoid(currentActivation);
            // node delta
            const dEdN = dEdO * dOdN;
            this.deltas[layer_i][i1] = dEdN;
            
            // bias
            const currentBias = layer.bias[i1]
            const newBias = currentBias - options.learningRate * dEdN;
            // update
            layer.bias[i1] = newBias;
            // this.changes_bias[layer_i][i1] += currentBias - options.learningRate * dEdN;
            // weights
            for (let i2 = 0; i2 < previous.size; ++i2) {
              const dNdW = previous.activation[i2];
              const dEdW = dEdN * dNdW;
              const currentWeight = layer.weights[i1][i2];
              const newWeight = currentWeight - options.learningRate * dEdW;
              // update
              layer.weights[i1][i2] = newWeight;
              // this.changes_weight[layer_i][i1][i2] += change;
            }
          }
        }
      }
    }
    // log error
    // if (iteration % 100 === 0) {
    //   console.log(`ERROR: ${mean_squared_error / data.length}, iteration: ${iteration}`)
    // }

    if (isNaN(mean_squared_error)) {
      throw new Error("Unknown error: maybe memory allocation failed")
    }
  }
}
