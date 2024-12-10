function parse(input: string): string[] {
  return input.trim().split('\n')
}

export function solution1(input: string) {
  const directions = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
  ]

  const sequence = 'XMAS'
  const reversedSquence = [...sequence].reverse().join('')
  const sLen = sequence.length
  const rows = parse(input)

  function check(x, y, sequence, direction) {
    const [dx, dy] = direction
    let i = 0
    let char
    while (i < sLen) {
      char = rows[y + dy * i]?.[x + dx * i]
      if (char === sequence[i]) {
        i++
      } else {
        return false
      }
    }
    return true
  }

  let count = 0
  for (let y = 0; y < rows.length; y++) {
    const row = rows[y]
    for (let x = 0; x < row.length; x++) {
      directions.forEach(direction => {
        count += check(x, y, sequence, direction) ? 1 : 0
        count += check(x, y, reversedSquence, direction) ? 1 : 0
      })
    }
  }

  return count
}

export function solution2(input: string) {
  const directions = [
    [
      [-1, 1],
      [1, -1],
    ],
    [
      [1, 1],
      [-1, -1],
    ],
  ]

  const sequence = 'MAS'
  const reversedSquence = [...sequence].reverse().join('')
  const sLen = sequence.length
  const rows = parse(input)

  function check(x, y, sequence, route) {
    const [[sx, sy], [dx, dy]] = route
    let i = 0
    let char
    const ox = x + sx
    const oy = y + sy
    while (i < sLen) {
      char = rows[oy + dy * i]?.[ox + dx * i]
      if (char === sequence[i]) {
        i++
      } else {
        return false
      }
    }

    return true
  }

  let count = 0
  for (let y = 0; y < rows.length; y++) {
    const row = rows[y]
    for (let x = 0; x < row.length; x++) {
      count += directions.every(route => check(x, y, sequence, route) || check(x, y, reversedSquence, route)) ? 1 : 0
    }
  }

  return count
}
