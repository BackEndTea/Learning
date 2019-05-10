#include <stdio.h>

int main(){
    int i = 1;
    i <<= 1;
    printf("Shifted 1 left %d\n", i);
    printf("Shifted 1 right %d\n", 1 >> 1);
    i = 64;
    printf("Shifted 64 to the left %d\n", i << 1);
    printf("Shifted 64 to the right %d\n", i >> 1);

    printf("Shifted 33 to the left %d\n", 33 << 1);
    printf("Shifted 33 to the right %d\n", 33 >> 1);
    printf("It rounds down\n");
    printf("Shifted 32 2 to the left %d\n", 32 << 2);
    printf("Shifted 32 2 to the right %d\n", 32 >> 2);
    return 0;
}
