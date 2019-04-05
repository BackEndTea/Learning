import time
import random
import statistics
import copy
import math
from bisect import bisect_left
from heapq import merge as hmerge

from sort_util import heapify
from sort_util import merge
from sort_util import Pile
from sort_util import create_heap
from sort_util import dequeue_max
from sort_util import insertion_sort


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

def introsort(arr, max_depth = None):
    if max_depth == None:
        max_depth = math.log(len(arr), 2)
    size = len(arr)
    pivot = size - 1

    if size <= 1:
        return arr
    elif pivot > max_depth:
        heapsort(arr)
    else:
        introsort(arr[0:p], max_depth - 1)
        introsort(arr[p + 1:n], max_depth - 1)
    return arr

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
    size_list = create_heap(arr)
    for heap_size in reversed(range(len(arr))):
        dequeue_max(arr, size_list, heap_size)
    return arr

def timsort(arr):
    runs, sorted_runs = [], []
    length = len(arr)
    new_run = [arr[0]]

    # for every i in the range of 1 to length of array
    for i in range(1, length):
        # if i is at the end of the list
        if i == length - 1:
            new_run.append(arr[i])
            runs.append(new_run)
            break
        # if the i'th element of the array is less than the one before it
        if arr[i] < arr[i-1]:
            # if new_run is set to None (NULL)
            if not new_run:
                runs.append([arr[i]])
                new_run.append(arr[i])
            else:
                runs.append(new_run)
                new_run = [arr[i]]
        # else if its equal to or more than
        else:
            new_run.append(arr[i])

    # for every item in runs, append it using insertion sort
    for item in runs:
        sorted_runs.append(insertion_sort(item))

    # for every run in sorted_runs, merge them
    sorted_array = []
    for run in sorted_runs:
        sorted_array = merge(sorted_array, run)
    return sorted_array

def validate_results(functions):
    result = [0, 0, 1, 2, 3, 4, 5, 5, 6, 7, 10, 13, 23, 23, 32, 33, 45, 45, 45, 45, 52, 59, 67, 72, 82, 123, 123, 190, 764]
    l = [0, 6, 2, 5, 10, 23, 7, 4, 5, 1, 0, 33, 45, 123, 3, 23, 45, 764, 190, 123, 32, 45, 59, 82, 72, 13, 45, 67, 52]
    for f in functions:
        arr = l.copy()
        assert result == f(arr)

        already_correct = [1,2,3,4,5,6,7,8,9,10] # already correct
        really_correct = [1,2,3,4,5,6,7,8,9,10]
        assert really_correct == f(already_correct)

        reverse = [10,9,8,7,6,5,4,3,2,1] # reversed
        assert really_correct == f(reverse)

        print('The {} function has the correct result'.format(f.__name__))

def benchmark(functions):
    times = {f.__name__: [] for f in functions}
    rand_list = random.sample(range(0,50000), 4000)
    correct_list = mergesort(rand_list.copy())
    for func in functions:
        print("Starting the benchmark of {}".format(func.__name__))
        for _ in range(1000):
            i = rand_list.copy()
            t0 = time.time()
            i = func(i)
            assert i == correct_list
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
        bubble_sort,
        heapsort,
        introsort,
        mergesort,
        patience_sorting,
        quicksort,
        shell_sort,
        smoothsort,
        timsort,
    ]
    # First we do a quick run to make sure that all versions return the same result
    print('Checking all functions have the same result.\n')
    validate_results(functions)
    print('\nAll functions have the same result. Now the benchmark starts.\n')
    benchmark(functions)
