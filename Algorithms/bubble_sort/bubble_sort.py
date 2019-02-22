# Bubble sort
def bubble_sort(arr):
    for i in range (0, len(arr)):
        for j in range(0,len(arr) - i -1):
            if arr[j] > arr[j+1] :
                arr[j], arr[j+1] = arr[j+1], arr[j]

    return arr

def bubble_sort_while(arr):
    unsorted = True
    sorted_count = 0
    while(unsorted):
        unsorted = False
        for i in range(0,len(arr) - 1 - sorted_count):
            if arr[i] > arr[i+1] :
                arr[i], arr[i+1] = arr[i+1], arr[i]
                unsorted = True
        sorted_count += 1

    return arr


input = [3, 4, 1, 5, 2]
print(bubble_sort(input))
print(bubble_sort_while(input))
