// 大整数加法,两个大整数相加，计算结果要求正确
export default function add(a, b) {
  let i = a.length - 1
  let j = b.length - 1
  // 进位标识
  let carry = 0
  let ret = ""
  // 思路：加法运算，大于10，需要往前进位+1
  while (i >= 0 || j >= 0) {
    let sum = 0
    // 边界情况
    if (i >= 0) {
      sum = a[i] - 0 + sum
      i--
    }
    if (j >= 0) {
      sum = b[j] - 0 + sum
      j--
    }
    sum += carry
    if (sum >= 10) {
      carry = 1
      sum -= 10
    } else {
      carry = 0
    }
    // 字符串和数字相加，转字符串
    ret = ret + sum
  }
  if (carry) {
    return carry + ret
  }
  return ret
}
