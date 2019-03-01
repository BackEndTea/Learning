def main():
    a = readfile()
    total_time = 0
    weighted_time = 0
    for i in a:
        total_time += i[0]
        weighted_time += total_time * i[1]
    print(weighted_time)

def readfile():
    with open('./greedy.txt') as f:
        content = f.readlines()
        # return sorted(list(map(numbers_to_tuple, content[1:])),key = lambda x: (x[0] - x[1], -x[0]))
        # return list(map(numbers_to_tuple, content[1:]))
        return sorted(list(map(numbers_to_tuple, content[1:])),key = lambda x: (x[0] / x[1], -x[0]))


def numbers_to_tuple(input):
    input = input.split()
    return (int(input[0]), int(input[1]))

if __name__ == "__main__":
    main()
