Neural.js
=========
[![NPM version](https://badgen.net/npm/v/neural.js)](https://www.npmjs.com/package/neural.js)
Work in progress...

A javascript library to create neural networks with!

## Features
- neural network class that adapts to data
- customize hidden layers
- Optimizers:
  - Stochastic Gardient Descend (SGD)

## Installation

Install with [npm](https://www.npmjs.com/)

```sh
npm install neural.js --save
```

## Usage

```javascript
import neural from "neural.js"

// XOR data
const data = [
  {input: [0, 0], output: [0]},
  {input: [0, 1], output: [1]},
  {input: [1, 0], output: [1]},
  {input: [1, 1], output: [0]},
]

const net = new neural.Network({
  learningRate: 0.04,
  iterations: 10000,
  hiddenLayers: [4, 4]
})
net.train(data)

net.run(data.input[0]) // 0.02
```

Articles I found useful:
- https://towardsdatascience.com/introduction-to-math-behind-neural-networks-e8b60dbbdeba
- https://mattmazur.com/2015/03/17/a-step-by-step-backpropagation-example/
