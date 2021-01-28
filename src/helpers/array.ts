export function splitArrayByPredicate<T>(
  items: T[],
  predicate: (item: T) => boolean
): { suited: T[]; unsuited: T[] } {
  const suited: T[] = []
  const unsuited: T[] = []

  items.forEach(item => {
    if (predicate(item)) suited.push(item)
    else unsuited.push(item)
  })

  return { suited, unsuited }
}
