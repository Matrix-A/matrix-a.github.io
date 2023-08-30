# 第8题: 序列中的最大乘积


# 题目

## 序列中的最大乘积

在下面的 $1000$ 位数中，相邻四位数的最大乘积是 $9\ast9\ast8\ast9=5832$。

$$
73167176531330624919225119674426574742355349194934 \\\\
96983520312774506326239578318016984801869478851843 \\\\
85861560789112949495459501737958331952853208805511 \\\\
12540698747158523863050715693290963295227443043557 \\\\
66896648950445244523161731856403098711121722383113 \\\\
62229893423380308135336276614282806444486645238749 \\\\
30358907296290491560440772390713810515859307960866 \\\\
70172427121883998797908792274921901699720888093776 \\\\
65727333001053367881220235421809751254540594752243 \\\\
52584907711670556013604839586446706324415722155397 \\\\
53697817977846174064955149290862569321978468622482 \\\\
83972241375657056057490261407972968652414535100474 \\\\
82166370484403199890008895243450658541227588666881 \\\\
16427171479924442928230863465674813919123162824586 \\\\
17866458359124566529476545682848912883142607690042 \\\\
24219022671055626321111109370544217506941658960408 \\\\
07198403850962455444362981230987879927244284909188 \\\\
84580156166097919133875499200524063689912560717606 \\\\
05886116467109405077541002256983155200055935729725 \\\\
71636269561882670428252483600823257530420752963450 \\\\
$$

从这 $1000$ 位数中，找到相邻的 $13$ 位数的乘积的最大值。

## Largest Product in a Series

The four adjacent digits in the $1000$-digit number that have the greatest product are $9\ast9\ast8\ast9=5832$.

$$
73167176531330624919225119674426574742355349194934 \\\\
\vdots \\\\
71636269561882670428252483600823257530420752963450 \\\\
$$

Find the thirteen adjacent digits in the $1000$-digit number that have the greatest product. What is the value of this product?

# 解题方法

使用滑动窗口算法来解最大乘积。时间复杂度为 $O(N)$。

```cpp
std::uint64_t Product(const std::string_view& Num, std::size_t size) {
    std::uint64_t result = 0;
    std::uint64_t temp = 1;
    for (std::size_t i = 0; i + size <= Num.size(); ++i) {
        temp = 1;
        for (std::size_t j = 0; j < size; ++j) {
            temp *= Num[i + j] - '0';
        }
        if (temp > result) {
            result = temp;
        }
    }
    return result;
}
```

<!-- 
# 优化

观察题目可知窗口大小为 $13$ ，每次滑动为 $1$ 位，并且考虑到 $0$ 在乘法运算中的特殊性，每个窗口记录以下两个值：

- 所有非 $0$ 位的乘积
- $0$ 的个数

在窗口滑动时，可以根据上个窗口的记录值、当前窗口左边的数字和窗口结尾的数字求得当前窗口需要记录的值以及所有数字的乘积。

该优化的本质上是使用使用一次除法运算替换多次乘法运算。

{{<admonition example 详细解释 true>}}

假设第 $n$ 位的数字为 $d_n$ ，则第 $n$ 个滑动窗口的各个数字为：

$$
\\{d_n,d_{n+1},d_{n+2},\dots,d_{n+12}\\}
$$

假设第 $n$ 个滑动窗口的所有数字的乘积为 $P_n$，所有非 $0$ 位的乘积为 $p_{n}$，$0$ 的个数为 $c_n$，则

$$
P_n=\begin{cases}
   p_{n} & c_n = 0 \\\\
   0 & c_n \not = 0 \\\\
\end{cases}
$$

观察数据可知， $p_{n+1}$ ， $c_{n+1}$ 可以使用 $p_n$、$c_n$、$d_n$ 和 $d_{n+13}$ 的值来进行快速计算，如下：

$$
c_{n+1}=\begin{cases}
   c_{n} & d_n = 0 \And d_{n+13} = 0 \\\\
   c_{n}+1 & d_n \not = 0 \And d_{n+13} = 0 \\\\
   c_{n}-1 & d_n = 0 \And d_{n+13} \not = 0 \\\\
   c_{n} & d_n \not = 0 \And d_{n+13} \not = 0 \\\\
\end{cases}
$$
$$
p_{n+1}=\begin{cases}
   p_{n} & d_n = 0 \And d_{n+13} = 0 \\\\
   p_{n} / d_n & d_n \not = 0 \And d_{n+13} = 0 \\\\
   p_{n}\ast d_{n+13} & d_n = 0 \And d_{n+13} \not = 0 \\\\
   p_{n} / d_n \ast d_{n+13} & d_n \not = 0 \And d_{n+13} \not = 0 \\\\
\end{cases}
$$

{{</admonition >}}

{{<admonition>}}

这种优化方法并不适用与该题目，原因为除法运算相较于乘法运算的开销较大（约为2-10倍）。

{{</admonition >}} 


```cpp
std::uint64_t Product(const std::string_view& Num, std::size_t size) {
    std::uint64_t result = 0;
    std::uint64_t temp = 1; // 所有非 0 位的乘积
    std::uint32_t count = 0; // 0 的个数
    for (std::size_t i = 0; i + size <= Num.size(); ++i) {
        if (i == 0) { // 计算第一个窗口的值
            for (std::size_t j = 0; j < size; ++j) {
                temp *= Num[i + j] == '0' ? count++, 1 : Num[i + j] - '0';
            }
            if (count == 0) result = temp;
        }
        else { // 处理当前窗口的最后一个值
            temp *= Num[i + size - 1] == '0' ? count++, 1 : Num[i + size - 1] - '0';
            if (temp > result && count == 0) {
                result = temp;
            }
        }
        if (Num[i] != '0')
            temp /= Num[i] - '0';
        else
            count--;
    }
    return result;
}
```
-->
# 基于 C++23 的实现

滑动窗口可以考虑使用C++23中的`std::views::slide`，遍历可以考虑使用并行版本的`std::for_each`，求积可以使用`std::accumulate`或者`std::reduce`，并行运算结果可以使用`std::atomic`记录。

```cpp
std::uint64_t Product(const std::string_view& Num, std::size_t size) {
    std::atomic<std::uint64_t> result = 0;
    const auto& windows = Num | std::views::slide(size); // 生成滑块
    std::for_each(std::execution::par_unseq, windows.begin(), windows.end(), [&result](std::ranges::viewable_range auto&& window) {
        // 因为大量的调用 std::reduce，因此仅使用「向量化」执行策略，不使用「并行化」执行策略
        std::uint64_t product = std::reduce(std::execution::unseq, window.begin(), window.end(), 1llu, [](const std::uint64_t& p, const char& c) -> std::uint64_t {
            return p * (c - '0');
            });
        while (true) {
            std::uint64_t old = result.load();
            if (old >= product || result.compare_exchange_weak(old, product)) {
                break;
            }
        }
        }
    );
    return result;
}
```
{{<admonition>}}

上述实现在数据量较小时，速度较慢，主要开销在于并行实现的线程创建和销毁上。

在数据量较大时，速度较快。实测可以在数据长度超过$10000000$时，达到基础实现的$5$倍以上。

{{</admonition >}}

<div class="hide">

# 正确答案

{{<admonition success 答案 true>}}

**23514624000**

{{</admonition >}}

</div>

