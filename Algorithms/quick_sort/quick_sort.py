
def main():
    input = [3,8,7,1,4,6,5,2]
    print (partition(input))

def quick_sort(input):
    if (len(input) == 1):
        return input

def partition(input):
    p = input[0]
    i = 0
    for j in range(0,len(input)):
        if input[j] < p:
            i+=1
            input[j], input[i] = input[i], input[j]

    input[0], input[i] = input[i], input[0]

    return input
if __name__ == "__main__":
    main()
