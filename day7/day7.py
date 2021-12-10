from math import floor
from statistics import mean, median
from functools import reduce

f = open("day7-example.txt", "r")
data = [int(num) for num in f.readlines()[0].strip().split(",")]


def triangleNumber(num):
    return reduce(lambda a, b: a + b, range(1, num + 1))


def useMedian(arr):
    return reduce(lambda count, num: count + abs(num - median(arr)), arr, 0)


def useAverage(arr):
    avg = floor(mean(arr))

    return reduce(
        lambda count, num: count + triangleNumber(abs(num - avg)),
        arr,
        0,
    )


print("Part 1: " + str(useMedian(data)))

print("Part 2: " + str(useAverage(data)))
