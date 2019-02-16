from heapq import heappush, heappop

def main():
    heaps(readfile())

def heaps(arr):
    max_heap = [] # lowest numbers
    min_heap = [] # highest numbers
    for i in arr:

        # initial case
        if(len(max_heap) == 0):
            heappush(max_heap, i * -1)
            count_out(max_heap, min_heap)
            continue

        # determine if to push onto max or min heap
        med = heappop(max_heap)
        heappush(max_heap, med)
        if(abs(med) > i):
            heappush(max_heap, i * -1)
        else:
            heappush(min_heap, i)

        #normalize size
        ln = len(max_heap) # lowest numbers
        hn = len(min_heap) # highest numbers
        if abs(ln - hn) <= 1:
            count_out(max_heap, min_heap)
            continue;

        if ln > hn:
            a = heappop(max_heap)
            heappush(min_heap, a * -1)
        else:
            a = heappop(min_heap)
            heappush(max_heap, a * -1)

        count_out(max_heap, min_heap)
    print(out % 10000)

out = 0
def count_out(max_heap, min_heap):
    global out
    ln = len(max_heap) # lowest numbers
    hn = len(min_heap) # highest numbers
    if ln == hn or ln > hn:
        a = abs(heappop(max_heap))
        out +=a
        heappush(max_heap, a * -1)
    else:
        a = abs(heappop(min_heap))
        out +=a
        heappush(min_heap, a)
    print(out)

def readfile():
    with open('./heap.txt') as f:
        content = f.readlines()

    return list(map(lambda x : int(x.strip()),content))

if __name__ == "__main__":
    main()

