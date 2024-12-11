function parse(input: string) {
  const [rulesInput, numbersInput] = input.trim().split('\n\n')
  const rules = rulesInput.split('\n').map(e => e.split('|').map(s => +s))
  const numbers = numbersInput.split('\n').map(e => e.split(',').map(s => +s))

  return { rules, numbers }
}

function sort(rules: number[][]) {
  const result = []
  for (const rule of rules) {
    const [a, b] = rule
    const aIndex = result.indexOf(a)
    const bIndex = result.indexOf(b)
    if (aIndex !== -1 && bIndex !== -1) {
      if (aIndex > bIndex) {
        result[aIndex] = b
        result[bIndex] = a
      }
    } else if (aIndex !== -1) {
      result.push(b)
    } else if (bIndex !== -1) {
      result.unshift(a)
    } else {
      result.push(a, b)
    }
  }
  return result
}

function getMiddleNumber(numbers: number[]) {
  return numbers[Math.floor(numbers.length / 2)]
}

export function solution0(input: string) {
  const { rules, numbers } = parse(input)
  const sorted = sort(rules)

  const valids = numbers.filter(s => {
    let i = 0
    while (i < s.length - 1) {
      const aIndex = sorted.indexOf(s[i])
      const bIndex = sorted.indexOf(s[i + 1])
      if (aIndex > bIndex) {
        return false
      }
      i++
    }
    return true
  })
  console.log('s0 valids', valids)
  const result = valids.reduce((sum, s) => {
    return sum + getMiddleNumber(s)
  }, 0)

  console.log('s0 result', result)
  return result
}

export function solution1(input: string) {
  const { rules, numbers } = parse(input)
  const uniqueNumbers = [...new Set(rules.flat())]
  const len = uniqueNumbers.length
  const matrix: boolean[][] = Array(len)
    .fill(0)
    .map(() => Array(len).fill(false))

  rules.forEach(rule => {
    const [a, b] = rule
    const x = uniqueNumbers.indexOf(a)
    const y = uniqueNumbers.indexOf(b)

    matrix[x][y] = true
  })

  console.log(['', ...uniqueNumbers].join('\t'))
  console.log(matrix.map((row, i) => uniqueNumbers[i] + '\t' + row.join('\t')).join('\n'))

  return numbers
    .filter(s =>
      s.every((n, i) => (i === 0 ? true : matrix[uniqueNumbers.indexOf(s[i - 1])][uniqueNumbers.indexOf(s[i])]))
    )
    .reduce((sum, s) => sum + getMiddleNumber(s), 0)
}

export function solution2(input: string) {
  const { rules, numbers } = parse(input)
  const uniqueNumbers = [...new Set(rules.flat())]
  const len = uniqueNumbers.length
  const matrix: boolean[][] = Array(len)
    .fill(0)
    .map(() => Array(len).fill(false))

  rules.forEach(rule => {
    const [a, b] = rule
    const x = uniqueNumbers.indexOf(a)
    const y = uniqueNumbers.indexOf(b)

    matrix[x][y] = true
  })

  console.log(['', ...uniqueNumbers].join('\t'))
  console.log(matrix.map((row, i) => uniqueNumbers[i] + '\t' + row.join('\t')).join('\n'))

  return numbers
    .filter(
      s => !s.every((n, i) => (i === 0 ? true : matrix[uniqueNumbers.indexOf(s[i - 1])][uniqueNumbers.indexOf(s[i])]))
    )
    .map(s => s.toSorted((x, y) => (matrix[uniqueNumbers.indexOf(x)][uniqueNumbers.indexOf(y)] ? -1 : 1)))
    .reduce((sum, s) => sum + getMiddleNumber(s), 0)
}
