const fs = require('fs')

const data = fs.readFileSync('day7-example.txt', 'utf8').trim().split(',').map(s => parseInt(s,10))

const range = (start, stop, step = 1) => {
  if (start > stop) step = -1 
  return Array(Math.ceil((stop - start + step) / step)).fill(start).map((x, y) => x + y * step)
}

const computeMedian = arr => {
  const mid = Math.floor(arr.length / 2)
  const nums = arr.sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

const triangleNumber = num => range(1, num).reduce((a, b) => a + b)

// Works but its sloooooow 🐢
const bruteForce = arr => {
  let smallestCost = Infinity 
  let min = Math.min(...data)
  let max = Math.max(...data)

  for (let i in range(min, max)) {
    let total = arr.reduce((count, num) => count + triangleNumber(Math.abs(num - i)), 0)
    smallestCost = Math.min(total, smallestCost)
  }

  return smallestCost
}

const useMedian = arr => {
  let median = computeMedian(arr)
  return arr.reduce((count, num) => count += Math.abs(num - median), 0)
}

const computeAverage = arr => Math.floor(arr.reduce((a, b) => a + b) / arr.length)

const useAverage = arr => {
  let average = computeAverage(arr)
  return arr.reduce((count, num) => count + triangleNumber(Math.abs(num - average)), 0)
}

console.log("Part 1: " + useMedian(data))

console.log("Part 2: " + useAverage(data))
