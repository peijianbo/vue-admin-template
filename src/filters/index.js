
export function booleanLabel(value) {
  if (value === true) {
    return '是'
  } else if (value === false) {
    return '否'
  } else {
    return value
  }
}
