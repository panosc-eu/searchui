import { format, isValid } from 'date-fns'

export function parseDate(date) {
  const dateObj = new Date(date)
  return isValid(dateObj) ? format(dateObj, 'dd. MM. yyyy') : 'not available'
}

export function capitalizeAndSpace(str) {
  return `${str[0].toUpperCase()}${str.slice(1).replaceAll('_', ' ')}`
}
