#include <stdio.h>

int add_numbers(int a, int b);
/* Declare the struct with integer members x, y */
typedef struct
{
    int x;
    int y;
} point;

int add(point p);

int main()
{
    int ret = add_numbers(3,4);
    printf("%d\n", ret);
    point p = {1,2};
    printf("%d\n", add(p));
    return 0;
}

int add_numbers(int a, int b)
{
    return a + b;
}

int add(point p)
{
    return p.x + p.y;
}

