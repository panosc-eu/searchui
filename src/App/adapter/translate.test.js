import translate from './translate'
import { initialFilters } from '../../filters'

test('documents query with root filter', () => {
  const query = translate(
    [
      {
        label: 'do-type',
        value: 'proposal',
      },
      {
        include: ['datasets', 'affiliation', 'person'],
        pageSize: 5,
        label: 'c',
        page: 1,
      },
    ],
    initialFilters,
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

test('documents query with root and parameter filters', () => {
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
      {
        include: ['datasets', 'affiliation', 'person'],
        pageSize: 5,
        label: 'c',
        page: 1,
      },
    ],
    initialFilters,
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
