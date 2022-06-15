import { Select } from '@rebass/forms/styled-components'
import useSWR from 'swr'

import { useQueryParam } from '../router-utils'

function AsynAutocomplete(props) {
  const { emptyOption, url, id } = props
  const param = useQueryParam(id)

  const { data: options } = useSWR(url)

  const sortedOptions = [...options].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true }),
  )

  function handleChange(evt) {
    const newVal = evt.target.value
    if (newVal === '') {
      param.remove()
    } else {
      param.setValue(newVal)
    }
  }

  return (
    <Select
      value={param.value || ''}
      onChange={handleChange}
      sx={{ flex: '1 1 0%', fontSize: 0 }}
    >
      <option value="">{emptyOption}</option>
      {sortedOptions.map((opt) => (
        <option key={opt.pid}>{opt.name}</option>
      ))}
    </Select>
  )
}

export default AsynAutocomplete
