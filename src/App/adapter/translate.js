import { createInclude, createWhere } from './lib/create'
import { stripEmptyKeys } from './lib/helpers'
import { mergeState, parseState } from './lib/state'

function prepare(initialState = []) {
  return function translate(endpoint, diffState) {
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
}

export default prepare
