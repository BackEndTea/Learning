import time
import random
import statistics
import copy

from sort_util import heapify
from sort_util import merge

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
    n = len(arr)

    # Build a maxheap.
    for i in range(n, -1, -1):
        heapify(arr, n, i)

    # One by one extract elements
    for i in range(n-1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]   # swap
        heapify(arr, i, 0)

def introsort(arr):
    pass

def mergesort(input):
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
        print('\tLONGEST ', max(numbers))
        print('\tSHORTEST ', min(numbers))


if __name__ == "__main__":
    main([
        binary_tree_sort,
        blocksort,
        bubble_sort,
        cubesort,
        heapsort,
        introsort,
        mergesort,
        patience_sorting,
        quicksort,
        shell_sort,
        smoothsort,
        timsort,
        tournament_sort,
    ])
