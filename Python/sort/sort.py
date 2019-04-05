import time
import random
import statistics
import copy


def binary_tree_sort(arr):
    pass

def blocksort(arr):
    pass

def bubble_sort(arr):
    unsorted = True
    sorted_count = 0
    while(unsorted):
        unsorted = False  # We assume the list is sorted when starting the loop
        for i in range(0,len(arr) - 1 - sorted_count):
            if arr[i] > arr[i+1] :
                arr[i], arr[i+1] = arr[i+1], arr[i]
                unsorted = True  # If we find any changes the list was not sorted, indicating we need at least one more loop
        sorted_count += 1
    return arr

def cubesort(arr):
    pass

def heapsort(arr):
    pass

def in_place_merge_sort(arr):
    pass

def introsort(arr):
    pass

def mergesort(input):
    assert input != sorted(input)
    def merge(input, second = []):
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

    n = len(input)
    if n <= 1:
        return input
    one = mergesort(input[:n//2])
    sec = mergesort(input[n//2:])
    return merge(one,sec)

def patience_sorting(arr):
    pass

def quicksort(arr):
    pass

def shell_sort(arr):
    pass

def smoothsort(arr):
    pass

def timsort(arr):
    pass

def tournament_sort(arr):
    pass

def main(functions):
    times = {f.__name__: [] for f in functions}
    rand_list = random.sample(range(0,50000), 4000)
    for func in functions:
        for _ in range(1000):
            i = rand_list.copy()
            t0 = time.time()
            func(i)
            t1 = time.time()

            times[func.__name__].append((t1 - t0) * 1000)
        print("finished {}".format(func.__name__))

    for name, numbers in times.items():
        print('FUNCTION:', name, 'Used', len(numbers), 'times')
        print('\tMEDIAN', statistics.median(numbers))
        print('\tMEAN  ', statistics.mean(numbers))
        print('\tSTDEV ', statistics.stdev(numbers))


if __name__ == "__main__":
    main([
        binary_tree_sort,
        blocksort,
        bubble_sort,
        cubesort,
        heapsort,
        in_place_merge_sort,
        introsort,
        mergesort,
        patience_sorting,
        quicksort,
        shell_sort,
        smoothsort,
        timsort,
        tournament_sort,
    ])
