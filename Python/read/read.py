
with open('file.csv', 'r') as f:
    a = [i for i in f]
    print(a)


with open('file.csv', 'r') as f:
    a = [i[1: -2] for i in f]
    print(a)
