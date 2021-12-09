const fs = require('fs')

const data = fs.readFileSync('day5-input.txt', 'utf8').trim().split(/\n/)
const range = (start, stop, step = 1) => {
  if (start > stop) step = -1 
  return Array(Math.ceil((stop - start + step) / step)).fill(start).map((x, y) => x + y * step)
}

const parseInput = (input) => {
  let [start, finish] = input.split(" -> ")

  let [x1, y1] = start.split(",").map(x => parseInt(x, 10))
  let [x2, y2] = finish.split(",").map(x => parseInt(x, 10))
  return {x1, x2, y1, y2}
}

const frequencies = (arr) => {
  let frequencyMap = {}

  arr.forEach(element => {
    let count = frequencyMap[element]
    count ? frequencyMap[element] = count + 1 : frequencyMap[element] = 1
  })
  return frequencyMap
}

const generateInbetweens = ({x1, x2, y1, y2}, allowDiagonal = false) => {
  if (x1 != x2 && y1 != y2) { 
    if (!allowDiagonal) return
    // moving diagonally
    const inbetweensX = range(x1, x2)
    const inbetweensY = range(y1, y2)

    return inbetweensX.map((x, idx) => [x, inbetweensY[idx]])
  }

  if (x1 != x2) {
    // moving on x axis
    const inbetweens = range(x1, x2)
    return inbetweens.map(num => [num, y1])
  }

  if (y1 != y2) {
    // moving on y axis
    const inbetweens = range(y1, y2)
    return inbetweens.map(num => [x1, num])
  }
}


const part1 = (transforms) => {
  let pts = transforms.map(t => generateInbetweens(t)).flat().filter(x => x !== undefined)
  let freq = frequencies(pts)
  let overlapping = Object.values(freq).filter(num => num > 1).length
  console.log(overlapping == 6311)
  return overlapping
}

const part2 = (transforms) => {
  let pts = transforms.map(arr => generateInbetweens(arr, true)).flat()
  let freq = frequencies(pts)
  let overlapping = Object.values(freq).filter(num => num > 1).length
  console.log(overlapping == 19929)
  return overlapping
}


let transforms = data.map(parseInput)

console.log("Part 1: " + part1(transforms))
console.log("Part 2: " + part2(transforms))

