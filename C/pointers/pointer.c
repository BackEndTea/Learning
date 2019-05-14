#include <stdio.h>

void addr_printer(int *input);
void addr_printer_no_pointer(int input);

int main()
{
    int foo = 300000;
    printf("With pointer\n\n");
    printf("Addres in main is\t\t%p\n", &foo);
    printf("Value in main is \t\t%d\n", foo);
    addr_printer(&foo);
    printf("Value in main after call is \t%d\n", foo);
    printf("\n\nWithout pointer\n\n");
    int foo_two = 300000;
    printf("Addres in main is \t\t%p\n", &foo_two);
    printf("Value in main is \t\t%d\n", foo_two);
    addr_printer_no_pointer(foo_two);
    printf("Value in main after call is \t%d\n", foo_two);

    return 0;
}

void addr_printer(int *input)
{
    printf("Addres in func is \t\t%p\n", input);
    printf("Value in func is \t\t%d\n", *input);
    *input = *input + 10;
    printf("Value in func is \t\t%d\n", *input);
}

void addr_printer_no_pointer(int input)
{
    printf("Addres in func is \t\t%p\n", &input);
    printf("Value in func is \t\t%d\n", input);
    input = input + 10;
    printf("Value in func is \t\t%d\n", input);
}
