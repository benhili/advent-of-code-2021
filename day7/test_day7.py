import day7

example = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]


def test_nth_triangular_number():
    assert day7.nth_triangular_number(5) == 15
    assert day7.nth_triangular_number(6) == 21
    assert day7.nth_triangular_number(7) == 28


def test_part1():
    assert day7.part1(example) == 37


def test_part2():
    assert day7.part2(example) == 168
