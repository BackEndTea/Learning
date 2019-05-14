/*
 * Given integers `n` and `m`, both
 * greater than 0, return a
 * rectangular array of size n by m
 * filled with integers 1 through
 * n*m, arranged in an inwards
 * spiral patter starting at the
 * top left. For example, given 3 and 5 you should return
 * 1,  2,  3,  4,  5
 * 12, 13, 14, 15, 6
 * 11, 10, 9,  8,  7
 */
#include <stdio.h>
#include <stdlib.h>

struct location {
    int j, i;
};

struct location get_i_and_j(int current, int n, int m);

int main(int argc, char *argv[]) {
    // Sample data
    int n = 5;
    int m = 3;
    if (argc == 3) {
        n = atoi(argv[1]);
        m = atoi(argv[2]);
    }

    int display[m][n];
    for (int current = 1; current <= n * m; current++) {
        struct location a = get_i_and_j(current, n, m);
        display[a.i][a.j] = current;
    }

    printf("Two Dimensional array elements:\n");
    int i, j;
    for(i=0; i<m; i++) {
        for(j=0;j<n;j++) {
            printf("%d\t", display[i][j]);
        }
        printf("\n");
    }
    return 0;
}

struct location get_i_and_j(int current, int n, int m) {
    // Top part
    if(current <= n){
        struct location a = {current -1, 0};
        return a;
    }

    // Going down on the right
    if (current <= n+m -1 ){
        struct location a = {n -1, current - n};
        return a;
    }

    // Going left on the bottom
    if (current <= 2* n +m - 2) {
        struct location a =  {(2* n +m - 2) - current, m -1 };
        return a;
    }

    // Going up on the left
    if (current <= 2*n + 2*m -4) {
        struct location a = {0,(2*n + 2*m -4) - current + 1};
        return a;
    }
    // We need to find the value of an inner loop, so we recurse
    struct location a = get_i_and_j(current - (2*n + 2*m -4), n -2, m - 2);
    a.i = a.i +1;
    a.j = a.j +1;

    return a;
}
