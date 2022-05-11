#include <stdio.h>

void get(double value, int *value_int, double *value_part)
{
    *value_int = (int)value;
    *value_part = value - *value_int;
}

int main(void)
{
    int n;
    double f;
    double num1;

    scanf("%lf", &num1);

    get(num1, &n, &f);
    printf("정수부=%d + 소수부=%f", n, f);

    return 0;
}