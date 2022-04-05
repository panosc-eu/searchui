import { Select } from '@rebass/forms/styled-components'
import useSWR from 'swr'

import { useQueryParam } from '../router-utils'

function AsynAutocomplete(props) {
  const { emptyOption, url, queryParam } = props
  const param = useQueryParam(queryParam)

  const { data: options } = useSWR(url)

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
      sx={{ flex: '1 1 0%' }}
    >
      <option value="">{emptyOption}</option>
      {options.map((opt) => (
        <option key={opt.pid}>{opt.name}</option>
      ))}
    </Select>
  )
}

export default AsynAutocomplete
