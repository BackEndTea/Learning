def main():
    x = 3141592653589793238462643383279502884197169399375105820974944592
    y = 2718281828459045235360287471352662497757247093699959574966967627
    out = 8539734222673567065463550869546574495034888535765114961879601127067743044893204848617875072216249073013374895871952806582723184
    print(multiply(x,y))
    print(x * y)

# Assume x and y are of the same lenght
def multiply(x,y):
    x = str(x)
    n = len(x)
    if (n < 2 ):
        return int(x)*int(y)
    n_half = n//2
    a = int(x[:n_half])
    b = int(x[n_half:])

    y = str(y)
    n_half = len(y)//2
    if (n_half < 2):
        return int(x) * int(y)
    c = int(y[:n_half])
    d = int(y[n_half:])

    out = (10**n * multiply(a,c) + 10**n_half * (multiply(a,d) + multiply(b,c)) + multiply(b,d))

    return out


def _multiply(x,y):
    pass


if __name__ == "__main__":
    main()
