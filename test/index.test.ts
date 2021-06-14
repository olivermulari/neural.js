import neural from "../build/neural"

describe("neural.js tests", () => {

  test("build should include neural as a default export", () => {
    const neural = require("../build/neural.js")
    expect(neural).toBeTruthy()
  })

  test("Network.train(): XOR", () => {
    const data = [
      {input: [0, 0], output: [0]},
      {input: [0, 1], output: [1]},
      {input: [1, 1], output: [0]},
      {input: [1, 0], output: [1]},
    ]

    const net = new neural.Network({
      learningRate: 0.02,
      iterations: 3000,
      hiddenLayers: [4, 4]
    })
    net.train(data)

    data.forEach((d) => {
      const error = Math.abs(d.output[0] - net.run(d.input)[0])
      expect(error).toBeLessThan(0.1)
    })
  })

  test("Network.train(): sin(x) function", () => {
    const data = new Array(10).fill(0).map((n) => Math.random()).map((n: number) => ({ input: [n], output: [Math.sin(n)] }))

    const net = new neural.Network({
      learningRate: 0.04,
      iterations: 20000,
      hiddenLayers: [4, 4]
    })
    net.train(data)

    data.forEach((d) => {
      const error = Math.abs(d.output[0] - net.run(d.input)[0])
      expect(error).toBeLessThan(0.1)
    })
  })

})