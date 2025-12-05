#include<iostream>
#include<string.h>
using namespace std;

# define max(a,b) (((a)>(b))?(a):(b))
int main()
{
    int value[8]={0,10,6,15,3,2,5,9};
    int weight[8]={0,2,3,5,4,3,2,6};
    int dp[8][17];
    memset(dp, 0, sizeof(dp));
    for(int i=1;i<8;i++){
        for(int j=1;j<17;j++){
            dp[i][j]=dp[i-1][j];
            if(weight[i]<=j)
                dp[i][j]=max(dp[i-1][j],dp[i-1][j-weight[i]]+value[i]);
        }
    }
    for(int j=0;j<17;j++)
        printf("%2d ", j);
    printf("\n");
    for(int i=0;i<8;i++){
        for(int j=0;j<17;j++)
            printf("%2d ", dp[i][j]);
        printf("\n");
    }
    printf("%d", dp[7][16]);
    return 0;
}

/*
0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 
0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0 
0  0 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 
0  0 10 10 10 16 16 16 16 16 16 16 16 16 16 16 16 
0  0 10 10 10 16 16 25 25 25 31 31 31 31 31 31 31 
0  0 10 10 10 16 16 25 25 25 31 31 31 31 34 34 34 
0  0 10 10 10 16 16 25 25 25 31 31 31 33 34 34 34 
0  0 10 10 15 16 16 25 25 30 31 31 36 36 36 38 39 
0  0 10 10 15 16 16 25 25 30 31 31 36 36 36 39 40 
40
*/
