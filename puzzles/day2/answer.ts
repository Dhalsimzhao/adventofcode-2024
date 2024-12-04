type Report = number[]
function parse(input: string): Report[] {
  return input
    .trim()
    .split('\n')
    .map(row => row.split(/\s+/).map(s => +s))
}

function isSafeDiff(n1: number, n2: number) {
  const diff = Math.abs(n1 - n2)
  return diff > 0 && diff < 4
}

function isSafe(report: Report) {
  const isIncreasing = report[1] > report[0]
  if(!isSafeDiff(report[0], report[1])) {
    return false
  }

  let i = 2
  while(i < report.length) {
    const prev = report[i-1], cur = report[i]
    if(isIncreasing !== cur > prev || !isSafeDiff(prev, cur)) {
      return false
    }
    i++
  }

  return true
}

export function solution1(input: string) {
  const reports = parse(input)
  return reports.filter(report => isSafe(report)).length
}




export function solution2(input: string) {
  const reports = parse(input)
  return reports.reduce((count, report) => {
    if(isSafe(report)) {
      return count + 1
    } else {
      count += report.some((_, i) => isSafe(report.filter((_, index) => index !== i))) ? 1 : 0
      return count
    }
  }, 0)
}