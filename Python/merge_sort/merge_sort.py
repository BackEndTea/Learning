def main():
    print(merge_sort([3,1,5,8,2,7,4,6,0,2,4,30,23,75]))

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
    return out


if __name__ == "__main__":
    main()
