import { template } from '../../filters'
import { LABEL_FOR_CONFIG } from './lib/state'
import applyTemplate from './translate'

const translate = applyTemplate(template)

const id = LABEL_FOR_CONFIG

test('no filter and default config', () => {
  const query = translate([])
  expect(query).toEqual({ limit: 5 })
})

test('no pagination', () => {
  const query = translate([{ id, limit: '0' }])
  expect(query).toEqual({ limit: '0' })
})

test('custom ordering', () => {
  const query = translate([
    {
      id,
      order: ['foo ASC', 'bar DESC'],
    },
  ])

  expect(query).toEqual({ order: ['foo ASC', 'bar DESC'], limit: 5 })
})

test('single root filter and custom include', () => {
  const query = translate([
    { id, include: ['datasets', 'affiliation', 'person'] },
    {
      id: 'type',
      value: 'proposal',
    },
  ])

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
  const query = translate([
    { id, include: ['datasets', 'affiliation', 'person'] },
    {
      id: 'type',
      value: 'experiment',
    },
    {
      id: 'sample_temperature',
      value: ['0', '7300'],
      operator: 'between',
      unit: 'K',
    },
  ])

  expect(query).toEqual({
    include: [
      {
        relation: 'members',
        scope: {
          include: [{ relation: 'affiliation' }, { relation: 'person' }],
        },
      },
      {
        relation: 'datasets',
        scope: {
          include: [
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
        },
      },
    ],
    where: { type: 'experiment' },
    limit: 5,
  })
})

test('all loopback query keys recognized by id', () => {
  const query = translate([
    { id: 'skip', value: 20 },
    { id: 'limit', value: 20 },
    { id: 'include', value: ['parameters'] },
    { id: 'fields', value: ['pid', 'title', 'description'] },
    { id: 'order', value: ['foo ASC', 'bar DESC'] },
  ])
  expect(query).toEqual({
    include: [
      {
        relation: 'datasets',
        scope: { include: [{ relation: 'parameters' }] },
      },
    ],
    order: ['foo ASC', 'bar DESC'],
    skip: 20,
    limit: 20,
    fields: { pid: true, title: true, description: true },
  })
})
