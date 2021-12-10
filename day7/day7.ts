import fs from 'fs'

const data = fs.readFileSync('day7-example.txt', 'utf8').trim().split(',').map(s => parseInt(s, 10))

const range = (start: number, stop: number, step = 1): number[] => {
  if (start > stop) step = -1
  return Array(Math.ceil((stop - start + step) / step)).fill(start).map((x, y) => x + y * step)
}

const computeMedian = (arr: number[]) => {
  const mid = Math.floor(arr.length / 2)
  const nums = arr.sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

const computeAverage = (arr: number[]) => Math.floor(arr.reduce((a, b) => a + b) / arr.length)

const triangleNumber = (num: number) => range(1, num).reduce((a, b) => a + b)

// Works but its sloooooow 🐢
const bruteForce = (arr: number[]): number => {
  let smallestCost = Infinity
  const min = Math.min(...data)
  const max = Math.max(...data)

  for (const i of range(min, max)) {
    const total = arr.reduce((count, num) => count + triangleNumber(Math.abs(num - i)), 0)
    smallestCost = Math.min(total, smallestCost)
  }

  return smallestCost
}

const useMedian = (arr: number[]) => {
  const median = computeMedian(arr)
  return arr.reduce((count, num) => count + Math.abs(num - median), 0)
}

const useAverage = (arr: number[]) => {
  const average = computeAverage(arr)
  return arr.reduce((count: number, num: number) => count + triangleNumber(Math.abs(num - average)), 0)
}

console.log("Part 1: " + useMedian(data))

console.log("Part 2: " + useAverage(data))
