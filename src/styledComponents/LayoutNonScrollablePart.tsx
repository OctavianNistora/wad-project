import React, { forwardRef } from 'react'
import { Box, BoxProps } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledNonScrollablePart = styled(Box, {
  name: 'StyledNonScrollablePart',
})(() => ({
  flex: '0 0 auto',
}))

export const LayoutNonScrollablePart = forwardRef(
  (props: BoxProps, ref: React.Ref<HTMLDivElement> | null) => {
    return <StyledNonScrollablePart ref={ref} {...props} />
  }
)

LayoutNonScrollablePart.displayName = 'LayoutNonScrollablePart'
