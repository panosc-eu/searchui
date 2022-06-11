import { createInclude, createWhere } from './lib/create'
import { stripEmptyKeys } from './lib/helpers'
import { merge, parse } from './lib/state'

const applyTemplateThenTranslate =
  (template = []) =>
  (state, endpoint = 'documents') => {
    const filters = merge(template, state)

    const [toInclude, toWhere, toRoot] = parse(filters, endpoint)

    const include = createInclude(toInclude)
    const where = createWhere(toWhere)
    const { skip, limit = 5, fields, order, q: query } = toRoot

    return stripEmptyKeys({
      include,
      where,
      order,
      query,
      skip,
      limit,
      fields,
    })
  }

export const translate = applyTemplateThenTranslate()

export default applyTemplateThenTranslate
