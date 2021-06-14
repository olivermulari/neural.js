import { ITrainData } from "./data";
import { AbstractLayer } from "./layers/AbstractLayer";
import { InputLayer } from "./layers/InputLayer";
import { Linear } from "./layers/Linear";
import { OutputLayer } from "./layers/OutputLayer";
import { Optimizer } from "./optimizer/Optimizer";

export interface INetworkOptions {
  iterations: number;
  learningRate: number;
  hiddenLayers: number[];
  layers: AbstractLayer[];
}

const defaultOptions: INetworkOptions = {
  iterations: 10000,
  learningRate: 0.01,
  hiddenLayers: [],
  layers: []
}

export class Network {
  options: INetworkOptions;
  layers: AbstractLayer[];

  constructor(options?: Partial<INetworkOptions>) {
    this.options = {...defaultOptions, ...options};
    this.layers = options?.layers || [];
  }
  
  private bindLayer(layer: AbstractLayer) {
    layer.network = this;
  }

  private validateData(data: ITrainData[]) {
    const inputSize = data[0].input.length
    const outputSize = data[0].output.length
    const inputIsValid = data.every((point) => point.input.length === inputSize)
    const outputIsValid = data.every((point) => point.output.length === outputSize)
    if (!inputIsValid && !outputIsValid) {
      throw new Error("Invalid data")
    }
  }

  private generateLayersFromData(data: ITrainData[]) {
    const layers: AbstractLayer[] = [];
    let inputSize = data[0].input.length
    let outputSize = data[0].output.length
    // output layer (assume fully connected)
    const input = new InputLayer(inputSize)
    input.init()
    layers.push(input)
    // hidden layers (default [])
    this.options.hiddenLayers.forEach((hiddenLayerSize) => {
      const layer = new Linear(hiddenLayerSize)
      layer.init(layers[layers.length - 1])
      layers.push(layer)
      inputSize = hiddenLayerSize
    })
    // output layer (assume fully connected)
    const output = new OutputLayer(outputSize)
    output.init(layers[layers.length - 1])
    layers.push(output)
    // set layers
    this.layers = layers;
    // bind layers
    layers.forEach(this.bindLayer)
  }

  public run(data: number[]) {
    if (!this.layers) {
      throw new Error("class Network: Network has no layers")
    }
    let activationRef = data;
    this.layers.forEach((layer) => {
      activationRef = layer.forwards(activationRef)
    })
    return activationRef;
  }

  public train(data: ITrainData[]) {
    // validate
    this.validateData(data)
    // generate layers
    if (!this.layers.length) {
      this.generateLayersFromData(data)
    }
    // init optimizer
    const optimizer = Optimizer.stochasticGradientDescend(this);
    // training iterations
    for (let iter = 1; iter <= this.options.iterations; ++iter) {
      optimizer.train(data, iter)
    }
  }
}
