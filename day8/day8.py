f = open("./day8-input.txt", "r")
data = f.readlines()

#   0:      1:      2:      3:      4:
#  aaaa    ....    aaaa    aaaa    ....
# b    c  .    c  .    c  .    c  b    c
# b    c  .    c  .    c  .    c  b    c
#  ....    ....    dddd    dddd    dddd
# e    f  .    f  e    .  .    f  .    f
# e    f  .    f  e    .  .    f  .    f
#  gggg    ....    gggg    gggg    ....

#   5:      6:      7:      8:      9:
#  aaaa    aaaa    aaaa    aaaa    aaaa
# b    .  b    .  .    c  b    c  b    c
# b    .  b    .  .    c  b    c  b    c
#  dddd    dddd    ....    dddd    dddd
# .    f  e    f  .    f  e    f  .    f
# .    f  e    f  .    f  e    f  .    f
#  gggg    gggg    ....    gggg    gggg


def parse_output(line):
    signal, output = line.split("|")
    return [
        sorted(signal.strip().split(" "), key=len),
        output.strip().split(" "),
    ]


# is 1, 4, 7, 8
def is_unique(number):
    return len(number) in [1, 4, 7, 8]


def part1(outputs):
    count = 0
    for output in outputs:
        count += sum(map(is_unique, output))
    return count


def common_chars(s1, s2):
    return len(set(s1).intersection(set(s2)))


def deduce(signals, outputs):
    one = signals[0]
    four = signals[2]
    n = ""
    for output in outputs:
        match len(output), common_chars(output, one), common_chars(output, four):
            case 6,2,3: n += '0'
            case 2,_,_: n += '1'
            case 5,1,2: n += '2'
            case 5,2,3: n += '3'
            case 4,_,_: n += '4'
            case 5,1,3: n += '5'
            case 6,1,3: n += '6'
            case 3,_,_: n += '7'
            case 7,_,_: n += '8'
            case 6,2,4: n += '9'
    print(n)
    return int(n)


signals, outputs = zip(*map(parse_output, data))

print(sum(map(deduce, signals, outputs)))
