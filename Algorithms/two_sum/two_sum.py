
def main():
    twoSum(readFile())

def readFile():
    with open('./two_sum_large.txt') as f:
        content = f.readlines()

    return list(map(lambda x : int(x.strip()),content))

def twoSum(arr):
    sums = 0
    items = {}
    for i in range(0, len(arr)):
        items[arr[i]] = arr[i]

    for _sum in range(-10000,10001):
        if (_sum % 10 == 0):
            print("Finished sums for ", _sum)
        for item in items:
            sumMinusElement =  _sum - item
            if (sumMinusElement == item):
                continue
            if (sumMinusElement in items):
                sums +=1
                break

    print(sums)

if __name__ == "__main__":
    main()

"""
-4
-2
-1
0
1
3
4
5
6
7
8
9
10
11
12
13
15
16
17
18
20
"""
