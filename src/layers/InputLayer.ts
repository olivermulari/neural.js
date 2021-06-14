import { AbstractLayer } from "./AbstractLayer";

export class InputLayer extends AbstractLayer {

  constructor(dataSize: number) {
    super(dataSize)
  }

  init() {
    this.activation = []
    for (let i = 0; i < this.size; ++i) {
      this.activation.push(0)
    }
  }

  forwards(input: number[]) {
    for (let i = 0; i < input.length; ++i) {
      this.activation[i] = input[i];
    }
    return this.activation;
  }

}
