function parse(input: string) {
  const rows: number[][] = input
    .trim()
    .split('\n')
    .map(row => row.split(/\s+/).map(s => +s))
  const list1 = [],
    list2 = []
  rows.forEach(row => {
    list1.push(row[0])
    list2.push(row[1])
  })
  return [list1, list2]
}

function sort(list: number[]) {
  return list.toSorted((a, b) => a - b)
}

export function solution1(input: string) {
  let [list1, list2] = parse(input)
  list1 = sort(list1)
  list2 = sort(list2)

  return list1.reduce((acc, cur, index) => {
    return acc + Math.abs(list1[index] - list2[index])
  }, 0)
}

export function solution2(input: string) {
  let [list1, list2] = parse(input)
  const memo = new Map()
  let result = 0
  list1.forEach(e => {
    if (!memo.has(e)) {
      const count = list2.reduce((acc, cur) => {
        if (cur === e) {
          acc++
        }
        return acc
      }, 0)
      memo.set(e, count)
    }
    const count = memo.get(e)

    result += e * count
  })

  return result
}
