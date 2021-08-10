import moment from 'moment'

export const parseDate = (date) => moment(date).format('L')

export const capitalizeAndSpace = (str) =>
  str[0].toUpperCase() + str.slice(1).split('_').join(' ')

export const documentSize = (datasets) => {
  const sum = datasets
    .map((item) => item.size)
    .reduce((acc, val) => acc + val, 0)
  return `${sum} MB`
}
