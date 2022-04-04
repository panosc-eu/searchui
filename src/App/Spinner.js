import React from 'react'
import PulseLoader from 'react-spinners/PulseLoader'

import { Box } from '../Primitives'
import { useAppStore } from './stores'

function Spinner() {
  const isDark = useAppStore((state) => state.isDark)

  return (
    <Box>
      <PulseLoader color={isDark ? 'white' : undefined} />
    </Box>
  )
}

export default Spinner
