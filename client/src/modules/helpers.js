export const isValidUrl = (string) => {
  if (!string.includes('https://') || !string.includes('http://')) {
    string = `https://${string}`;
  }

  try {
    return new URL(string);
  } catch {
    return false;
  }
};

export const toSeconds = (minutes, seconds) => { return (minutes * 60) + seconds; };

export const toMinutesAndSeconds = (seconds) => {
  let mins = seconds / 60;
  let secs = seconds % 60;

  return {minutes: mins, seconds: secs};
};