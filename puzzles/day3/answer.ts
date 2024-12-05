export function solution1(input: string) {
  const reg = /mul\((?<num1>\d+),(?<num2>\d+)\)/g
  let match = null
  let sum = 0
  while ((match = reg.exec(input)) !== null) {
    sum += match.groups.num1 * match.groups.num2
  }
  return sum
}

export function solution2(input: string) {
  const reg = /mul\((?<num1>\d+),(?<num2>\d+)\)|(?<enable>do\(\))|(?<disable>don't\(\))/g
  let match = null
  let sum = 0
  let enabled = true
  while ((match = reg.exec(input)) !== null) {
    const { num1, num2, enable, disable } = match.groups
    if (num1 && num2) {
      if (enabled) {
        sum += match.groups.num1 * match.groups.num2
      }
    } else if (enable) {
      enabled = true
    } else if (disable) {
      enabled = false
    }
  }
  return sum
}
