import { AbstractLayer } from "./AbstractLayer";

export class OutputLayer extends AbstractLayer {
  constructor(outputSize: number) {
    super(outputSize)
  }

  init(previousLayer: AbstractLayer) {
    this.initWeightsAndBiases(previousLayer)
  }

}
