export function validateNumber(val, minVal, maxVal) {
    if (val < minVal || val > maxVal) {
      return maxVal
    }
    return val
  }