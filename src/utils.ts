export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function getRandomMapEntry<K, V>(map: Map<K, V>): [K, V] | undefined {
  const entries = Array.from(map.entries())
  if (entries.length === 0) return undefined
  return entries[Math.floor(Math.random() * entries.length)]
}

export function randNumsUniqueToMax(max: number, reserved: number[], N: number): number[] {
  const allNums = Array.from({ length: max }, (_, i) => i).filter(num => !reserved.includes(num))

  // ensure there are enough numbers
  if (allNums.length < N) throw new Error('not enough available numbers from 0-max')

  // randomly pick N numbers from the remaining pool
  const pickedNums: number[] = []

  // pick by removing and pushing from all to picked
  for (let i = 0; i < N; i++) {
    const randI = Math.floor(Math.random() * allNums.length)
    pickedNums.push(allNums.splice(randI, 1)[0])
  }

  return pickedNums
}

