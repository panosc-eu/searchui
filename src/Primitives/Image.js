import React from 'react'

import {Image} from 'rebass/styled-components'
import styled from 'styled-components'

const RImage = (props) => <SImage {...props} />

export default RImage

const SImage = styled(Image)`
  display: block;
`
