export const transformToHours = (duration: number) => {
  let hours: number | string = Math.floor(duration / 3600);
  let minutes: number | string = Math.floor((duration - hours * 3600) / 60);
  let seconds: number | string = duration - hours * 3600 - minutes * 60;

  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;

  return `${hours}:${minutes}:${seconds} ${hours === '01' ? 'hour' : 'hours'}`;
};

export const transformLaunchDate = (launchDate: string): string => {
  const date = new Date(launchDate);
  return date.toLocaleString('default', { dateStyle: 'long', timeStyle: 'short' });
};
