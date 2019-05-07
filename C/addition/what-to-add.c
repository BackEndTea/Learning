#include <stdio.h>
#include <stdlib.h>

int main()
{
    int *first_number = malloc(10);
    if (first_number == NULL) {
        printf("No memory\n");
        return 1;
    }

    int *second_number = malloc(10);
    if (second_number == NULL) {
        printf("No memory\n");
        return 1;
    }
    printf("What is the first number? ");
    scanf("%10d", first_number);


    printf("What is the second number? ");
    scanf("%10d", second_number);
    printf("%d\n", *first_number +  *second_number);
    return 0;
}
