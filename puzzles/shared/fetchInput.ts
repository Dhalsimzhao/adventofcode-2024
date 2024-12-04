import token from '../../token'

export async function fetchInput(day: number) {
  const input = await fetch(`https://adventofcode.com/2024/day/${day}/input`, {
    headers: { cookie: `session=${token}` },
  }).then(res => res.text()).catch(() => '')
  return input
}