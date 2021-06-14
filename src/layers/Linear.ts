import { AbstractLayer } from "./AbstractLayer";

export class Linear extends AbstractLayer {
  constructor(size: number) {
    super(size)
  }

  init(previousLayer: AbstractLayer) {
    this.initWeightsAndBiases(previousLayer)
  }

}
