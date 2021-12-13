f = open("./day8-example.txt", "r")
data = f.readlines()

answer = 26

number_to_segment = {
    2: 1,
    3: 7,
    4: 4,
    5: [2, 3, 5],
    6: [0, 6, 9],
    7: 8,
}

uniques = [1, 7, 4, 8]

mappings = {
    "a": False,
    "b": False,
    "c": False,
    "d": False,
    "e": False,
    "f": False,
    "g": False,
}



def parse_output(line):
    return line.strip().split("|")


# is 1, 4, 7, 8
def is_unique(number):
    return len(number) in uniques


outputs = map(parse_output, data)
# TODO something

print(outputs)

count = 0

# for output in outputs:
#     count += sum(map(is_unique, output))


print(count)
