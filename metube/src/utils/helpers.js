export function dateDiff(pastDate) {
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

const timeFormat = (timer) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${parseInt(minutes) % 60}`.slice(-2);
  const getHours =
    Math.floor(timer / 3600) < 100
      ? `0${Math.floor(timer / 3600)}`.slice(-2)
      : `${Math.floor(timer / 3600)}`.slice(-3);
  return getHours > 0
    ? `${getHours > 0 && getHours}:${getMinutes}:${getSeconds}`
    : getMinutes > 9
    ? `${getMinutes}:${getSeconds}`
    : `${Number(getMinutes).toString()}:${getSeconds}`;
};

export const videoDuration = (duration) => {
  const pattern = /(?:([\d]+)D)?T(?:([\d]+)H)?(?:([\d]+)M)?(?:([\d]+)S)/;
  const groups = duration.match(pattern);
  if (groups !== null) {
    const days = groups[1] === undefined ? 0 : parseInt(groups[1]);
    const hours = groups[2] === undefined ? 0 : parseInt(groups[2]);
    const minutes = groups[3] === undefined ? 0 : parseInt(groups[3]);
    const seconds = groups[4] === undefined ? 0 : parseInt(groups[4]);
    const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
    return timeFormat(totalSeconds);
  }
};
