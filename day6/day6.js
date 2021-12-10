const fs = require('fs')

const input = fs.readFileSync('day6-example.txt', 'utf8').trim()
const data = input.split(",").map(x => parseInt(x, 10))
const spawnTime = 0      // at internal timer 0 a new fish is spawned
const newSpawnTime = 8  // new fish start with an internal timer of 8
const resetTime = 6       // after spawning fish are reset to 6

const frequencies = (arr) => {
  let frequencyMap = {}
  arr.forEach(
    element => {
      frequencyMap[element] = frequencyMap[element] + 1 || 1
    })
  return frequencyMap

}

const updateShoal = (shoal) => {
  let newShoal = {}
  for (const [internalTimer, count] of Object.entries(shoal)) {
    if (internalTimer == spawnTime) {
      newShoal[newSpawnTime] = count
      newShoal[resetTime] = count
    } else {
      let dec = parseInt(internalTimer) - 1
      newShoal[dec] = newShoal[dec] + count || count
    }
  }

  return newShoal
}

const countFish = (shoal) => Object.values(shoal).reduce((total, num) => total + num)

const progress = (shoal, maxDays, days = 0) => {
  if (days == maxDays) {
    return countFish(shoal)
  }

  let updatedShoal = updateShoal(shoal)
  return progress(updatedShoal, maxDays, days + 1)
}

const shoal = frequencies(data)

console.log("Part 1: " + progress(shoal, 80))
console.log("Part 2: " + progress(shoal, 256))

