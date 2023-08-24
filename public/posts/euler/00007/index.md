# 第7题: 第 $10001$ 个素数


# 题目

## 第 $10001$ 个素数

通过查看素数表的前 $6$ 个数字 $2,3,5,7,11$ 和 $13$ ，我们可以得知第 $6$ 个素数为 $13$ 。

第$10001$个素数是多少？

## $10001$st Prime

By listing the first six prime numbers: $2,3,5,7,11$, and $13$, we can see that the $6$th prime is $13$.

What is the $10001$st prime number?

# 解题方法

## 查表

直接通过网络上提供的素数表，查取第 $10001$ 个素数。

如 [The Nth Prime Page](https://t5k.org/nthprime/index.php#nth)。

也可以通过询问 AI 得到第 $10001$ 个素数。

## 筛法

根据素数计数函数的近似值 $\pi(x)=\frac{x}{ln(x)}$，可以粗略估计需要的判断的自然数范围。

$$
\begin{aligned}
\pi(50000)&=\frac{50000}{ln(50000)}\approx 4621.166782321471 \\\\
\pi(100000)&=\frac{100000}{ln(100000)}\approx 8685.889638065037 \\\\
\pi(150000)&=\frac{150000}{ln(150000)}\approx 12585.59191195029
\end{aligned}
$$

考虑到 $\pi(x)$ 在大于 $10^5$ 时，存在小于 $10%$ 的误差，因此使用使用 $150000$ 作为筛法的上界。

使用「埃氏筛法」或者「欧拉筛法」筛选出答案。

# 参考代码

```c++
std::int64_t prime() {
    constexpr std::int64_t num{ 150000 };
    const std::int64_t sqrt{
        static_cast<std::int64_t>(std::floor(std::sqrt(num)))
    };
    std::vector<std::int64_t> result;
    std::vector<std::int64_t> prime(num + 1, 0);
    std::vector<std::int64_t> visit(num + 1, 0);
    for (std::int64_t i = 2; i <= num; ++i) {
        if (!visit[i]) {
            prime[++prime[0]] = i;
            if (prime[0] == 10001) return i;
        }
        for (std::int64_t j = 1; j <= prime[0] && i * prime[j] <= sqrt; ++j) {
            visit[i * prime[j]] = 1;
            if (i % prime[j] == 0) break;
        }
    }
    return 0;
}
```

<div class="hide">

# 正确答案

{{<admonition success 答案 true>}}

**104743**

{{</admonition >}}

</div>

# 参考链接

- [维基百科 - 素数计数函数](https://zh.wikipedia.org/zh-hans/%E7%B4%A0%E6%95%B0%E8%AE%A1%E6%95%B0%E5%87%BD%E6%95%B0)
- [维基百科 - 试除法](https://zh.wikipedia.org/zh-cn/%E8%AF%95%E9%99%A4%E6%B3%95)
- [维基百科 - 埃拉托斯特尼筛法](https://zh.wikipedia.org/zh-cn/%E5%9F%83%E6%8B%89%E6%89%98%E6%96%AF%E7%89%B9%E5%B0%BC%E7%AD%9B%E6%B3%95)
- [OI.Wiki - 素数筛法](https://oi.wiki/math/number-theory/sieve/)
