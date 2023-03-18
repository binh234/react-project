export function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export function dateDiff(pastDate: Date) {
  const now = new Date();
  const millisecondsPassed = now.getTime() - pastDate.getTime();
  const secondsPassed = Math.floor(millisecondsPassed / 1000);
  const minutesPassed = Math.floor(secondsPassed / 60);
  const hoursPassed = Math.floor(minutesPassed / 60);
  const daysPassed = Math.floor(hoursPassed / 24);
  const monthsPassed =
    (now.getFullYear() - pastDate.getFullYear()) * 12 +
    (now.getMonth() - pastDate.getMonth());
  const yearsPassed = now.getFullYear() - pastDate.getFullYear();

  if (minutesPassed < 60) {
    return `${minutesPassed} minutes ago`;
  } else if (hoursPassed < 25) {
    return `${hoursPassed} hours ago`;
  } else if (daysPassed < 32) {
    return `${daysPassed} days ago`;
  } else if (monthsPassed < 12) {
    return `${monthsPassed} months ago`;
  } else {
    return `${yearsPassed} years ago`;
  }
}
