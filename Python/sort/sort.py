import time
import random
import statistics
import copy
from bisect import bisect_left
from heapq import merge as hmerge

from sort_util import heapify
from sort_util import merge
from sort_util import Pile

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
    return arr

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
    """
    In computer science, patience sorting is a sorting algorithm inspired by, and named after, the card game patience.
    A variant of the algorithm efficiently computes the length of a longest increasing subsequence in a given array.
    """
    piles = []
    # sort into piles
    for x in arr:
        new_pile = Pile([x])
        i = bisect_left(piles, new_pile)
        if i != len(piles):
            piles[i].append(x)
        else:
            piles.append(new_pile)

    # use a heap-based merge to merge piles efficiently
    arr[:] = hmerge(*[reversed(pile) for pile in piles])
    return arr

def quicksort(arr):
    less = []
    pivot_list = []
    more = []
    if len(arr) <= 1:
        return arr
    else:
        pivot = arr[0]
        for i in arr:
            if i < pivot:
                less.append(i)
            elif i > pivot:
                more.append(i)
            else:
                pivot_list.append(i)
        less = quicksort(less)
        more = quicksort(more)
        return less + pivot_list + more

def shell_sort(arr):
    inc = len(arr) // 2
    while inc:
        for i, el in enumerate(arr):
            while i >= inc and arr[i - inc] > el:
                arr[i] = arr[i - inc]
                i -= inc
            arr[i] = el
        inc = 1 if inc == 2 else int(inc * 5.0 / 11)
    return arr

def smoothsort(arr):
    pass

def timsort(arr):
    pass

def tournament_sort(arr):
    pass

def validate_results(functions):
    result = [1,2,3,4,5,6,7,8,9,10]
    for f in functions:
        arr = [8,9,2,3,10,7,4,6,1,5]
        assert result == f(arr)
        print('The {} function has the correct result'.format(f.__name__))

def benchmark(functions):
    times = {f.__name__: [] for f in functions}
    rand_list = random.sample(range(0,50000), 4000)
    for func in functions:
        print("Starting the benchmark of {}".format(func.__name__))
        for _ in range(1000):
            i = rand_list.copy()
            t0 = time.time()
            func(i)
            t1 = time.time()

            times[func.__name__].append((t1 - t0) * 1000)
        print("Finished the benchmark of {}".format(func.__name__))

    for name, numbers in times.items():
        print('FUNCTION:', name, 'Used', len(numbers), 'times')
        print('\tMEDIAN', statistics.median(numbers))
        print('\tMEAN  ', statistics.mean(numbers))
        print('\tSTDEV ', statistics.stdev(numbers))
        print('\tLONGEST ', max(numbers))
        print('\tSHORTEST ', min(numbers))


if __name__ == "__main__":
    functions = [
        # binary_tree_sort,
        # blocksort,
        bubble_sort,
        # cubesort,
        heapsort,
        # introsort,
        mergesort,
        patience_sorting,
        quicksort,
        shell_sort,
        # smoothsort,
        # timsort,
        # tournament_sort,
    ]
    # First we do a quick run to make sure that all versions return the same result
    print('Checking all functions have the same result.\n')
    validate_results(functions)
    print('\nAll functions have the same result. Now the benchmark starts.\n')
    benchmark(functions)
