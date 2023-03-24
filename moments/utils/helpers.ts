const timeUnit = {
  en: {
    long: {
      second: 'seconds',
      minute: 'minutes',
      hour: 'hours',
      day: 'days',
      month: 'months',
      year: 'years',
    },
    short: {
      second: 's',
      minute: 'm',
      hour: 'h',
      day: 'd',
      month: 'mth',
      year: 'y',
    },
  },
}

export function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export function dateDiff(pastDate: Date, lang: string = 'en') {
  const selectedTimeUnit = timeUnit['en']['long']
  const now = new Date()
  const millisecondsPassed = now.getTime() - pastDate.getTime()
  const secondsPassed = Math.floor(millisecondsPassed / 1000)
  const minutesPassed = Math.floor(secondsPassed / 60)
  const hoursPassed = Math.floor(minutesPassed / 60)
  const daysPassed = Math.floor(hoursPassed / 24)
  const monthsPassed =
    (now.getFullYear() - pastDate.getFullYear()) * 12 + (now.getMonth() - pastDate.getMonth())
  const yearsPassed = now.getFullYear() - pastDate.getFullYear()

  if (secondsPassed < 60) {
    return `right now`
  } else if (minutesPassed < 60) {
    return `${minutesPassed} ${selectedTimeUnit['minute']}`
  } else if (hoursPassed < 24) {
    return `${hoursPassed} ${selectedTimeUnit['hour']}`
  } else if (daysPassed < 31) {
    return `${daysPassed} ${selectedTimeUnit['day']}`
  } else if (monthsPassed < 12) {
    return `${monthsPassed} ${selectedTimeUnit['month']}`
  } else {
    return `${yearsPassed} ${selectedTimeUnit['year']}`
  }
}

export function dateDiffShort(pastDate: Date, lang: string = 'en') {
  const selectedTimeUnit = timeUnit['en']['short']
  const now = new Date()
  const millisecondsPassed = now.getTime() - pastDate.getTime()
  const secondsPassed = Math.floor(millisecondsPassed / 1000)
  const minutesPassed = Math.floor(secondsPassed / 60)
  const hoursPassed = Math.floor(minutesPassed / 60)
  const daysPassed = Math.floor(hoursPassed / 24)
  const monthsPassed =
    (now.getFullYear() - pastDate.getFullYear()) * 12 + (now.getMonth() - pastDate.getMonth())
  const yearsPassed = now.getFullYear() - pastDate.getFullYear()

  if (secondsPassed < 60) {
    return `right now`
  } else if (minutesPassed < 60) {
    return `${minutesPassed}${selectedTimeUnit['minute']}`
  } else if (hoursPassed < 24) {
    return `${hoursPassed}${selectedTimeUnit['hour']}`
  } else if (daysPassed < 31) {
    return `${daysPassed}${selectedTimeUnit['day']}`
  } else if (monthsPassed < 12) {
    return `${monthsPassed}${selectedTimeUnit['month']}`
  } else {
    return `${yearsPassed}${selectedTimeUnit['year']}`
  }
}

export function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  const formatter = new Intl.DateTimeFormat('en-US', options)
  return formatter.format(date)
}

export function getCurrentDateTime(): string {
  const currentDateTime = new Date().toISOString()
  return currentDateTime
}

export function getFutureDateTime(addition: number): Date {
  const currentDate = new Date()
  const futureDateTime = new Date(currentDate.getTime() + addition)
  return futureDateTime
}

export function validateNumber(val: number, minVal: number, maxVal: number): number {
  if (val < minVal || val > maxVal) {
    return maxVal
  }
  return val
}
