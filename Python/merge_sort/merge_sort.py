inversions = 0

def main():
    print(merge_sort([1,3,5,7,2,4,6]))
    print(inversions)

def merge_sort(input):
    n = len(input)
    if n <= 1:
        return input
    one = merge_sort(input[:n//2])
    sec = merge_sort(input[n//2:])
    return merge(one,sec)

def merge(input, second = []):
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
        global inversions
        inversions += len(input) - i
    return out


if __name__ == "__main__":
    main()
