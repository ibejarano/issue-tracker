export function getIsoDate(date) {
  let isoTime = new Date(date)
  return `${isoTime.getFullYear()}-${isoTime.getMonth() + 1}-${isoTime.getDate()} ${isoTime.getHours()}:${isoTime.getMinutes()}`
}
