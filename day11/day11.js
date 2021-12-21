const fs = require('fs')

const data = fs.readFileSync('day11.input', 'utf8').split("\n")

const parseData = (data) => data.map(line => line.split("").map(char => parseInt(char, 10)))

const incrementAll = (arr) => arr.map(element => element + 1)

const incrementNeighbours = (matrix, x, y) => {
    let right = x + 1 < matrix[0].length
    let left = x - 1 >= 0
    let up = y - 1 >= 0
    let down = y + 1 < matrix.length

    if (right) {
        if (matrix[y][x + 1] !== 0) {
            matrix[y][x + 1] += 1
        }
    }

    if (left) {
        if (matrix[y][x - 1] !== 0) {
            matrix[y][x - 1] += 1
        }
    }

    if (up) {
        if (matrix[y - 1][x] !== 0) {
            matrix[y - 1][x] += 1
        }
    }

    if (down) {
        if (matrix[y + 1][x] !== 0) {
            matrix[y + 1][x] += 1
        }
    }

    if (up && right) {
        if (matrix[y - 1][x + 1] !== 0) {
            matrix[y - 1][x + 1] += 1
        }
    }

    if (up && left) {
        if (matrix[y - 1][x - 1] !== 0) {
            matrix[y - 1][x - 1] += 1
        }
    }

    if (down && right) {
        if (matrix[y + 1][x + 1] !== 0) {
            matrix[y + 1][x + 1] += 1
        }
    }

    if (down && left) {
        if (matrix[y + 1][x - 1] !== 0) {
            matrix[y + 1][x - 1] += 1
        }
    }

    return matrix
}

const allZeroes = (matrix) =>
    matrix.map(line => line.every(val => val === 0)).every(res => res === true)

const step = (matrix, n, count = 0, iterations = 0) => {
    if (iterations >= n) {
        return count
    }

    matrix = matrix.map(incrementAll)
    let flashed = true

    while (flashed) {
        // Not a fan of mutating the matrix in place so many times
        flashed = false
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[0].length; x++) {
                if (matrix[y][x] >= 10) {
                    // Octopus flashing 🐙
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
        return iterations
    }

    return step(matrix, n, count, iterations + 1)
}

const input = parseData(data)

console.log("Part1: ", step(input, 100))
console.log("Part2: ", step(input, 999))