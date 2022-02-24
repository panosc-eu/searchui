import { createInclude, createWhere } from './lib/create'
import { stripEmptyKeys } from './lib/helpers'
import { mergeState, parseState } from './lib/state'

function translate(diffState, initialState = [], endpoint = 'documents') {
    const state = mergeState(initialState, diffState)
    const [toInclude, toWhere, base] = parseState(state, endpoint)

    const include = createInclude(toInclude)
    const where = createWhere(toWhere)

    return stripEmptyKeys({
      include,
      where,
      ...base,
    })
  }

export default translate
