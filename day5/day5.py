import re
from collections import Counter, namedtuple

f = open("./day5-example.txt", "r")
data = f.readlines()

Vector = namedtuple("Point", "x1 y1 x2 y2")


def parse_vectors(vector):
    x1, y1, x2, y2 = map(int, re.findall("\d", vector))
    return Vector(x1, y1, x2, y2)


vectors = map(parse_vectors, data)


def interpolate(vec, allowDiagonal = False):
  if (vec.x1 != vec.x2 and vec.y1 != vec.y2):
    if (!allowDiagonal):
        return

    # moving diagonally
    interpolate_x = range(vec.x1, vec.x2 + 1)
    interpolate_y = range(vec.y1, vec.y2 + 1)

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


def part1(points) => {
  let pts = transforms.map(t => generateInbetweens(t)).flat().filter(x => x !== undefined)
  let freq = frequencies(pts)
  let overlapping = Object.values(freq).filter(num => num > 1).length
  console.log(overlapping == 6311)
  return overlapping
}

# const part2 = (transforms) => {
#   let pts = transforms.map(arr => generateInbetweens(arr, true)).flat()
#   let freq = frequencies(pts)
#   let overlapping = Object.values(freq).filter(num => num > 1).length
#   console.log(overlapping == 19929)
#   return overlapping
# }


# let transforms = data.map(parseInput)

# console.log("Part 1: " + part1(transforms))
# console.log("Part 2: " + part2(transforms))
