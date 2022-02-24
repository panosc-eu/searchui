import { createInclude, createWhere } from './lib/create'
import { stripEmptyKeys } from './lib/helpers'
import { createPagination, mergeState, parseState } from './lib/state'

const DEFAULT_CONFIG = {
  endpoint: 'documents',
  include: [],
  pageSize: 5, // `false` to disable limit/pagination
  page: 1,
  order: undefined, // e.g.`['foo ASC', 'bar DESC']`
}

function translate(diffState, initialState = [], queryConfig = {}) {
  const config = { ...DEFAULT_CONFIG, ...queryConfig }

  const state = mergeState(initialState, diffState)
  const [toInclude, toWhere] = parseState(state, config)

  const include = createInclude(toInclude)
  const where = createWhere(toWhere)
  const pagination = createPagination(config)

  return stripEmptyKeys({
    include,
    where,
    order: config.order,
    ...pagination,
  })
}

export default translate
