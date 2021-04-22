export function getIsoDate(date) {
  let isoTime = new Date(date);
  return isoTime.toLocaleString();
}
