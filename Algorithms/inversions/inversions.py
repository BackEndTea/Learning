
def main():
    print(sort_and_count_inversions(readfile())[0])

def readfile():
    with open('./integerarray.txt') as f:
        content = f.readlines()

    return map(lambda x : int(x.strip()),content)

def sort_and_count_inversions(input):
    n = len(input)
    if n == 1:
        return (0, input)

    x = sort_and_count_inversions(input[:n//2])
    y = sort_and_count_inversions(input[n//2:])
    z = merge_and_sort_and_count_split_inversions(x[1], y[1])
    return (x[0] + y[0] + z[0], z[1])


def merge_and_sort_and_count_split_inversions(input, second = []):
    inversions = 0
    i = 0
    j = 0
    n = len(input) + len(second)
    out = []
    for _ in range(0, n):
        try:
            inp = input[i]
        except IndexError:
            out.append(second[j])
            j += 1
            continue

        try:
            sec = second[j]
        except IndexError:
            out.append(input[i])
            i += 1
            continue

        if inp < sec:
            out.append(input[i])
            i += 1
            continue
        out.append(second[j])
        j += 1
        inversions += len(input) - i
    return (inversions, out)

if __name__ == "__main__":
    main()
