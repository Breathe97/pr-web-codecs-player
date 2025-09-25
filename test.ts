const arr1 = []
const arr2 = []

const compare = (arr1 = [], arr2 = []) => {
  const str1 = arr1.join('-')
  const str2 = arr2.join('-')
  return str1 === str2
}

const res = compare(arr1, arr2)

console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: res`, res)
