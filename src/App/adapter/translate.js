import { createInclude, createWhere } from './lib/create'
import { stripEmptyKeys } from './lib/helpers'
import { LABEL_FOR_CONFIG, createPagination, merge, parse } from './lib/state'

const DEFAULT_CONFIG = {
  queryParam: LABEL_FOR_CONFIG,
  include: [],
  pageSize: 5, // `false` to disable limit/pagination
  page: 1,
}

const applyTemplateThenTranslate =
  (template = []) =>
  (state, endpoint = 'documents') => {
    const filters = merge([DEFAULT_CONFIG, ...template], state)

    const [toInclude, toWhere, toRoot] = parse(filters, endpoint)

    const include = createInclude(toInclude)
    const where = createWhere(toWhere)
    const pagination = createPagination(toRoot)
    const { order, q: query } = toRoot

    return stripEmptyKeys({
      include,
      where,
      order,
      query,
      ...pagination,
    })
  }

export const translate = applyTemplateThenTranslate()

export default applyTemplateThenTranslate
