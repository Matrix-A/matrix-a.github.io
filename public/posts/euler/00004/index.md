# 第4题: 最大的回文乘积


# 题目

## 最大的回文乘积

回文数就是正反两边读都是相同的数。两个两位数的乘积中最大的回文数是 $9009=91*99$。

找到两个三位数乘积中最大的回文数。

## Largest Palindrome Product

A palindromic number reads the same both ways. The largest palindrome made from the product of two $2$-digit numbers is $9009=91*99$.

Find the largest palindrome made from the product of two $3$-digit numbers.

# 解题方法

## 分析

假设回文数为 $'abccba'$，则有以下计算：

$$
\begin{aligned}
'abccba'&=100000a+10000b+1000c+100c+10b+a \\\\
&=100001a+10010b+1100c \\\\
&=11(9091a+910b+100c) \\\\
\end{aligned}
$$

因此所求回文数必然存在一个三位数因数为 $11$ 的倍数。

假设存在一个回文数 $z$ 为两个三位数的乘积，则最大的回文数乘积的三位数必然大于 $z/999$。

两个三位数的乘积的最大值为 $999*999=998001$，最小值为 $100*100=10000$。因此所求的最大的回文数乘积必然为一个六位数或一个五位数。

## 思路

实现一个六位数和五位数的回文数判断函数。

从 $999$ 开始遍历 $x$ 和 $y$，下界为 $100$ 和 $z/999$。

# 参考代码

```cpp
bool is_palindrome_5_6(int z) {
    if (z >= 100000 && z <= 999999) {
        return z % 10 == z / 100000 
            && z / 10 % 10 == z / 10000 % 10 
            && z / 100 % 10 == z / 1000 % 10;
    }
    else if (z >= 10000 && z <= 99999) {
        return z % 10 == z / 10000 
            && z / 10 % 10 == z / 1000 % 10;
    }
    else {
        return false;
    }
}

int palindrome_product() {
    int result = 0;
    int l = 100; // x 的下界
    for (int x = 999; x >= l; --x) {
        int yi = x % 11 ? 990 : 999;
        // 若 x 不为 11 的倍数，则 y 必须为 11 的倍数
        int yt = x % 11 ? 11 : 1; 
        for (int y = yi; y >= x; y -= yt) {
            auto t = x * y;
            if (is_palindrome_5_6(t)) {
                if (result > t) break;
                else {
                    result = t;
                    l = t / 999;
                }
            }
        }
    }
    return result;
}
```


<div class="hide">

# 正确答案

{{<admonition success 答案 true>}}

**906609**

{{</admonition >}}

</div>
