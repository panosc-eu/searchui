import { format, isValid } from 'date-fns'

export function parseDate(date) {
  const dateObj = new Date(date)
  return isValid(dateObj) ? format(dateObj, 'd MMM yyyy') : 'not available'
}

export function capitalizeAndSpace(str) {
  return `${str[0].toUpperCase()}${str.slice(1).replaceAll('_', ' ')}`
}

const isEmpty = (obj) => JSON.stringify(obj) === '{}'
export const stripEmptyKeys = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && !isEmpty(v)),
  )
