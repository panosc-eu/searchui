import React from 'react'

import {Link} from 'rebass/styled-components'

const RLink = (props) => <Link target={props.blank && '_blank'} {...props} />

export default RLink
