import moment from 'moment';

export function parseDate(date) {
  return moment(date).format('L');
}

export function capitalizeAndSpace(str) {
  return `${str[0].toUpperCase()}${str.slice(1).replaceAll('_', ' ')}`;
}

export function documentSize(datasets) {
  const sum = datasets
    .map((item) => item.size)
    .reduce((acc, val) => acc + val, 0);

  return `${sum} MB`;
}
