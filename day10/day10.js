const fs = require('fs')

const data = fs.readFileSync('day10.input', 'utf8').split("\n")

const pairs = {
    "{": "}",
    "[": "]",
    "(": ")",
    "<": ">",
    "}": "{",
    "]": "[",
    ")": "(",
    ">": "<"
}

const open = new Set(["{", "[", "<", "("])

const mismatchScores = new Map([
    [")", 3],
    ["]", 57],
    ["}", 1197],
    [">", 25137]
])

const completionScores = new Map([
    [")", 1],
    ["]", 2],
    ["}", 3],
    [">", 4]
])

const detectMismatches = (line) => {
    let unclosed = []

    for (let i = 0; i < line.length; i++) {
        let brace = line[i]
        if (open.has(brace)) {
            // open bracket
            unclosed.push(brace)

        } else {
            //closed bracket
            let lastOpen = unclosed.pop()
            if (lastOpen && lastOpen !== pairs[brace]) {
                // Code linting style logging
                // console.log("Mismatching braces on line:", i, "expected", pairs[lastOpen], "but found", brace, "instead.")

                // return illegal character
                return brace
            }
        }
    }
}

const completeIncompleteLine = (line) => {
    let unclosed = []

    for (let i = 0; i < line.length; i++) {
        let brace = line[i]
        if (open.has(brace)) {
            unclosed.push(brace)
        } else {
            unclosed.pop()
        }
    }

    return unclosed.reverse().map(brace => pairs[brace])
}

const part1Score = (brace) => {
    if (mismatchScores.has(brace)) {
        return mismatchScores.get(brace)
    }

    return 0
}

const part2Score = (line) => {
    return line.reduce((total, brace) => (5 * total) + completionScores.get(brace), 0)
}

// part1
console.log(data.map(detectMismatches).reduce((total, brace) => total + part1Score(brace), 0))

// part2
const incompleteLines = data.filter(line => detectMismatches(line) === undefined)
const completions = incompleteLines.map(completeIncompleteLine)


const scores = completions.map(part2Score).sort((a, b) => a - b)
console.log(scores[Math.floor(scores.length / 2)])

