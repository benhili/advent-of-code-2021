from statistics import mean, median
from functools import reduce

f = open("./day7-example.txt", "r")
data = [int(num) for num in f.readlines()[0].strip().split(",")]


# Gets nth triangle number eg. 5th number = 5 + 4 + 3 + 2 + 1
# https://en.wikipedia.org/wiki/Triangular_number
def nth_triangular_number(num):
    return reduce(lambda a, b: a + b, range(1, num + 1), 0)


def part1(arr):
    return reduce(lambda count, num: count + abs(num - median(arr)), arr, 0)


# This works for the example but for my dataset I have to swap floor for round
# I blame advent of code :)))
def part2(arr):
    avg = round(mean(arr))

    return reduce(
        lambda count, num: count + nth_triangular_number(abs(num - avg)),
        arr,
        0,
    )


if __name__ == "__main__":
    print("Part 1: " + str(part1(data)))
    print("Part 2: " + str(part2(data)))
