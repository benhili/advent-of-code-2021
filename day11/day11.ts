const fs = require('fs')

const data: string[] = fs.readFileSync('day11.input', 'utf8').split("\n")

const parseData = (data: string[]): number[][] => data.map(line => line.split("").map(char => parseInt(char, 10)))

const incrementAll = (arr: number[]) => arr.map(element => element + 1)

const incrementNeighbours = (matrix: number[][], x: number, y: number): number[][] => {
    let up = y - 1 >= 0
    let down = y + 1 < matrix.length
    let left = x - 1 >= 0
    let right = x + 1 < matrix[0].length

    if (right && matrix[y][x + 1] !== 0) { matrix[y][x + 1] += 1 }

    if (left && matrix[y][x - 1] !== 0) { matrix[y][x - 1] += 1 }

    if (up && matrix[y - 1][x] !== 0) { matrix[y - 1][x] += 1 }

    if (down && matrix[y + 1][x] !== 0) { matrix[y + 1][x] += 1 }

    if (up && right && matrix[y - 1][x + 1] !== 0) { matrix[y - 1][x + 1] += 1 }

    if (up && left && matrix[y - 1][x - 1] !== 0) { matrix[y - 1][x - 1] += 1 }

    if (down && right && matrix[y + 1][x + 1] !== 0) { matrix[y + 1][x + 1] += 1 }

    if (down && left && matrix[y + 1][x - 1] !== 0) { matrix[y + 1][x - 1] += 1 }

    return matrix
}

// matrix contains zero in every position
const allZeroes = (matrix: number[][]) =>
    matrix.map(
        (nums: number[]) => nums.every(num => num === 0))
        .every((res: boolean) => res)

const step = (matrix: number[][], n: number, count = 0, iterations = 0) => {
    if (iterations >= n) {
        return count
    }

    matrix = matrix.map(incrementAll)
    let flashed = true

    while (flashed) {
        flashed = false
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[0].length; x++) {
                if (matrix[y][x] >= 10) {
                    // Octopus flashing ✨🐙✨
                    matrix[y][x] = 0
                    matrix = incrementNeighbours(matrix, x, y)
                    flashed = true
                    count += 1
                }
            }
        }
    }

    if (allZeroes(matrix)) {
        // first time every octopus was synchronised
        return iterations + 1
    }

    return step(matrix, n, count, iterations + 1)
}

const input = parseData(data)

console.log("Part1: ", step(input, 100))
console.log("Part2: ", step(input, 999))