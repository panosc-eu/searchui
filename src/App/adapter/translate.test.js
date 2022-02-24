import { initialFilters } from '../../filters'
import translate from './translate'

test('no filter and default config', () => {
  const query = translate([], initialFilters)
  expect(query).toEqual({ limit: 5 })
})

test('no pagination', () => {
  const query = translate([], initialFilters, { pageSize: false })
  expect(query).toEqual({})
})

test('custom pagination', () => {
  const query = translate([], initialFilters, { pageSize: 10, page: 2 })
  expect(query).toEqual({ limit: 10, skip: 10 })
})

test('custom ordering', () => {
  const query = translate([], initialFilters, {
    order: ['foo ASC', 'bar DESC'],
  })

  expect(query).toEqual({ order: ['foo ASC', 'bar DESC'], limit: 5 })
})

test('single root filter and custom include', () => {
  const query = translate(
    [
      {
        label: 'do-type',
        value: 'proposal',
      },
    ],
    initialFilters,
    { include: ['datasets', 'affiliation', 'person'] },
  )

  expect(query).toEqual({
    include: [
      {
        relation: 'members',
        scope: {
          include: [{ relation: 'affiliation' }, { relation: 'person' }],
        },
      },
      { relation: 'datasets' },
    ],
    where: { type: 'proposal' },
    limit: 5,
  })
})

test('multiple filters and custom include', () => {
  const query = translate(
    [
      {
        label: 'do-type',
        value: 'experiment',
      },
      {
        label: 'pa-sample_temperature',
        value: ['0', '7300'],
      },
    ],
    initialFilters,
    { include: ['datasets', 'affiliation', 'person'] },
  )

  expect(query).toEqual({
    include: [
      {
        relation: 'members',
        scope: {
          include: [{ relation: 'affiliation' }, { relation: 'person' }],
        },
      },
      { relation: 'datasets' },
      {
        relation: 'parameters',
        scope: {
          where: {
            and: [
              { name: 'sample_temperature' },
              { value: { between: ['0', '7300'] } },
              { unit: 'K' },
            ],
          },
        },
      },
    ],
    where: { type: 'experiment' },
    limit: 5,
  })
})
