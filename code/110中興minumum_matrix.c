#include <stdio.h>
#include <limits.h>
#include <stdlib.h>

void print_optimal_parens(int **s, int i, int j) {
    if (i == j) {
        printf("A%d", i);
    } else {
        printf("(");
        print_optimal_parens(s, i, s[i][j]);
        print_optimal_parens(s, s[i][j] + 1, j);
        printf(")");
    }
}

int main(void) {
    // 矩陣尺寸 p = {10,5,20,10,5}
    // 代表 A1:10x5, A2:5x20, A3:20x10, A4:10x5
    int p[] = {10,5,20,10,5};
    int n = (sizeof(p) / sizeof(p[0])) - 1; // 矩陣個數 n

    // 動態配置 m 與 s（二維陣列，1..n 為有效索引）
    int **m = (int **)malloc((n+1) * sizeof(int *));
    int **s = (int **)malloc((n+1) * sizeof(int *));
    for (int i = 0; i <= n; ++i) {
        m[i] = (int *)malloc((n+1) * sizeof(int));
        s[i] = (int *)malloc((n+1) * sizeof(int));
    }

    // 初始化
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (i == j) m[i][j] = 0;
            else m[i][j] = INT_MAX / 4;
            s[i][j] = 0;
        }
    }

    // 主 DP（按區間長度 l）
    for (int l = 2; l <= n; ++l) {           // l = 子序列長度（至少 2）
        for (int i = 1; i <= n - l + 1; ++i) {
            int j = i + l - 1;
            for (int k = i; k < j; ++k) {
                long long q = (long long)m[i][k] + m[k+1][j] + (long long)p[i-1] * p[k] * p[j];
                if (q < m[i][j]) {
                    m[i][j] = (int)q;
                    s[i][j] = k;
                }
            }
        }
    }
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            if (m[i][j] == INT_MAX / 4) printf("   - ");
            else                printf("%4d ", m[i][j]);
        }
        printf("\n");
    }


    printf("最少純量乘法次數 m[1][%d] = %d\n", n, m[1][n]);
    printf("最佳括號化：");
    print_optimal_parens(s, 1, n);
    printf("\n");

    // 釋放記憶體
    for (int i = 0; i <= n; ++i) {
        free(m[i]);
        free(s[i]);
    }
    free(m);
    free(s);

    return 0;
}
/*
0 1000 1500 1500 
-    0 1000 1250 
-    -    0 1000 
-    -    -    0 
最少純量乘法次數 m[1][4] = 1500
最佳括號化：(A1((A2A3)A4))
*/