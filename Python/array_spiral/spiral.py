"""
Given integers `n` and `m`, both
greater than 0, return a
rectangular array of size n by m
filled with integers 1 through
n*m, arranged in an inwards
spiral patter starting at the
top left. For example, given 3 and 5 you should return
1,  2,  3,  4,  5
12, 13, 14, 15, 6
11, 10, 9,  8,  7
 """
import sys

def main():
    n = 5
    m = 3
    if len(sys.argv) == 3:
        n = int(sys.argv[1])
        m = int(sys.argv[2])

    a = []
    for i in range(m):
        a.append([])
        for j in range(n):
            a[i].append(0)


    for current in range(1, n * m + 1):
        i_and_j = get_i_and_j(current, n, m)
        a[i_and_j[1]][i_and_j[0]] = current

    for line in a:
        for val in line:
            print(str(val) + "\t", end="")
        print("")


def get_i_and_j(current, n, m):
    # Top part
    if(current <= n):
        return [current -1, 0]

    # Going down on the right
    if (current <= n+m -1 ):
        return [n -1, current - n]


    # Going left on the bottom
    if (current <= 2* n +m - 2):
        return [(2* n +m - 2) - current, m -1 ]


    # Going up on the left
    if (current <= 2*n + 2*m -4) :
        return [0,(2*n + 2*m -4) - current + 1]

    # We need to find the value of an inner loop, so we recurse
    i, j = get_i_and_j(current - (2*n + 2*m -4), n -2, m - 2)

    return [i +1, j +1]

if __name__ == "__main__":
    main()
