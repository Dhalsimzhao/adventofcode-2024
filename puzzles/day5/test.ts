import { fetchInput } from '../shared/fetchInput'
import { solution1, solution2 } from './answer'

async function s1() {
  const input = await fetchInput(5)
  console.log('solution1', solution1(input))
}

async function s2() {
  const input = await fetchInput(5)
  console.log('solution2', solution2(input))
}

// s1()
s2()