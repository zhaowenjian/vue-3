
export function remove (arr, item) {
  const idx = arr.indexOf(item)
  return idx < 0 ? arr : arr.slice(idx, 1)
}