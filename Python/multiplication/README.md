## Karatsuba Multiplication

Multiply two n digit numbers.

e.g.
```
f(x,y) = x*y
x = 10^(n/2)a+b
y = 10^(n/2)c+d
xy = (10^(n/2)a+b)(10^(n/2)c+d)
xy = (10^n * ac + 10^(n/2)(ad + bc) + bd)
```

Steps
1. Recursively compute ac
2. Recursively compute bd
3. Recursively compute (a+b)(c+d) = ac + ad + bc + bd
4. Gaus's (3) - (1) - (2) = (ac + ad + bc + bd) - ac - bd = ad + bc
