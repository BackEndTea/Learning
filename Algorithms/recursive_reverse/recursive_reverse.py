
def main():
    a = "asdfghjkl"
    print(rr(a))

def rr(a):
    return a if len(a)==1 else a[-1:]+rr(a[:-1])

if __name__ == "__main__":
    main()
