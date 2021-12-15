from functools import partial
from itertools import starmap

f = open("./day9.example", "r")
data = [line.rstrip() for line in f.readlines()]

# EMBRACE THE LIST COMPREHENSION
input = [[int(num) for num in list(line)] for line in data]


def neighbours(arr, y, x):
    coords = []
    if x > 0:
        # left
        coords.append([y, x - 1])

    if y > 0:
        coords.append([y - 1, x])

    if x < len(arr[0]) - 1:
        coords.append([y, x + 1])

    if y < len(arr) - 1:
        coords.append([y + 1, x])

    return coords


def lower(a, b):
    return a < b


def get(arr, y, x):
    return arr[y][x]


def part1(input):
    res = []
    for y, line in enumerate(input):
        for x, num in enumerate(line):
            surrounding_nums = list(
                starmap(partial(get, input), neighbours(input, y, x))
            )
            if all(map(partial(lower, num), surrounding_nums)):
                res.append(num)

    return sum(res) + len(res)


def traverse(arr, y, x):
    adjacent = neighbours(arr, y, x)

    for point in adjacent:
        traverse()


def part2(input):
    return input


print(part1(input))
print(part2(input))
