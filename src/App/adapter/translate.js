import { createInclude, createWhere } from './lib/create'
import { stripEmptyKeys } from './lib/helpers'
import { createPagination, parseState } from './lib/state'

const DEFAULT_CONFIG = {
  endpoint: 'documents',
  filterables: [],
  include: [],
  pageSize: 5, // `false` to disable limit/pagination
  page: 1,
  order: undefined, // e.g.`['foo ASC', 'bar DESC']`
}

function translate(filters, queryConfig = {}) {
  const config = { ...DEFAULT_CONFIG, ...queryConfig }
  const { filterables, order } = config

  const state = filters.map((f) => ({ ...filterables[f.label], ...f }))
  const [toInclude, toWhere] = parseState(state, config)

  const include = createInclude(toInclude)
  const where = createWhere(toWhere)
  const pagination = createPagination(config)

  return stripEmptyKeys({
    include,
    where,
    order,
    ...pagination,
  })
}

export default translate
