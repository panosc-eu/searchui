import { filterables } from '../../filters'
import translate from './translate'

test('no filter and default config', () => {
  const query = translate([])
  expect(query).toEqual({ limit: 5 })
})

test('no pagination', () => {
  const query = translate([], { pageSize: false })
  expect(query).toEqual({})
})

test('custom pagination', () => {
  const query = translate([], { pageSize: 10, page: 2 })
  expect(query).toEqual({ limit: 10, skip: 10 })
})

test('custom ordering', () => {
  const query = translate([], { order: ['foo ASC', 'bar DESC'] })
  expect(query).toEqual({ order: ['foo ASC', 'bar DESC'], limit: 5 })
})

test('single root filter and custom include', () => {
  const query = translate(
    [
      {
        label: 'type',
        value: 'proposal',
      },
    ],
    {
      filterables,
      include: ['datasets', 'affiliation', 'person'],
    },
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
        label: 'type',
        value: 'experiment',
      },
      {
        label: 'sample_temperature',
        value: ['0', '7300'],
      },
    ],
    {
      filterables,
      include: ['datasets', 'affiliation', 'person'],
    },
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
