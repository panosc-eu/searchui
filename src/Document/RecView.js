const view = (pairs) => {
  const reducer = (acc, scope) => {
    const [k, v] = scope

    if (Array.isArray(v)) {
      return [
        ...acc,
        <>
          array {k}, {v.map(view)}
        </>,
      ]
    }

    if (Object(v) === v) {
      const pairs = Object.entries(v)
      return [
        ...acc,
        <>
          nested {k} {view(pairs)}
        </>,
      ]
    }

    return [
      ...acc,
      <>
        basic {k} {v}
      </>,
    ]
  }

  return pairs.reduce(reducer, [])
}

export default view
