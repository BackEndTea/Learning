def heapify(arr, n, i):
    largest = i    # Initialize largest as root
    l = 2 * i + 1  # left = 2*i + 1
    r = 2 * i + 2  # right = 2*i + 2

    # See if left child of root exists and is
    # greater than root
    if l < n and arr[i] < arr[l]:
        largest = l

    # See if right child of root exists and is
    # greater than root
    if r < n and arr[largest] < arr[r]:
        largest = r

    # Change root, if needed
    if largest != i:
        arr[i],arr[largest] = arr[largest],arr[i]  # swap

        # Heapify the root.
        heapify(arr, n, largest)


def merge(input, second = []):
    """
    Merges 2 lists together, assuming both lists are already sorted.
    """
    i = 0
    j = 0
    n = len(input) + len(second)
    out = []
    for _ in range(0, n):
        try:
            inp = input[i]
        except IndexError:
            out += second[j:]
            break

        try:
            sec = second[j]
        except IndexError:
            out += input[i:]
            break

        if inp < sec:
            out.append(input[i])
            i += 1
            continue
        out.append(second[j])
        j += 1
    return out


