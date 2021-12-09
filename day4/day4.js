const fs = require('fs')

const data = fs.readFileSync('day4-input.txt', 'utf8').split(/\n\n/)

const parseRow = (row) => row.trim().split(/\s+/).map(num => parseInt(num, 10))
const parseBoard = (board) => board.trim().split("\n").map(parseRow)

const rawBoards = data.slice(1)

const moves = data[0].split(",").map(num => parseInt(num, 10))
const boards = rawBoards.map(parseBoard)

const isWinningRow = (row, moves) => row.every(num => moves.includes(num))
const getColumn = (arr, n) => arr.map(x => x[n])
const transpose = (arr) => arr[0].map((_, idx) => getColumn(arr, idx))

const isWinningBoard = (board, moves) => {
  return board.some(row => isWinningRow(row, moves)) ||
          transpose(board).some(row => isWinningRow(row,moves))
}

const calculateScore = (board, moves) => {
  let unmarkedNums = board.flat().filter(num => !moves.includes(num))

  if (unmarkedNums.length > 0) return (unmarkedNums.reduce((a, b) => a + b) * moves[moves.length -1])

  return 0
}

const part1 = (moves, boards) => {
  for (let i = 1; i < moves.length; i++) {
    let currentMoves = moves.slice(0, i)

    let scores = boards.map((board, idx) => {
      return {"won": isWinningBoard(board, currentMoves), "board": idx}
    })

    let winningBoards = scores.filter(x => x.won == true)

    if (winningBoards.length > 0) {
      let winner = boards[winningBoards[0].board]
      return calculateScore(winner, currentMoves)
    }
  }
  return 0
}

const part2 = (moves, boards, i = 1) => {
  if (i >= moves.length) return 0;
  if (boards.length < 1) return -200;

  let currentMoves = moves.slice(0, i)

  let scores = boards.map((board, idx) => {
    return {"won": isWinningBoard(board, currentMoves), "board": idx}
  })


  if (boards.length == 1) {
    let winningBoards = scores.filter(x => x.won == true)

    if (winningBoards.length > 0) {
      let winner = boards[winningBoards[0].board]
      return calculateScore(winner, currentMoves)
    }
  }

  let losingBoards = scores.filter(x => x.won == false).map(x => boards[x.board])

  return part2(moves, losingBoards, i+1)
}


console.log("Part1: " + parseInt(part1(moves, boards), 10))
console.log("Part2: " + parseInt(part2(moves, boards), 10))
