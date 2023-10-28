import React, { forwardRef } from 'react'
import { Box, BoxProps } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledScrollablePart = styled(Box, {
  name: 'StyledScrollablePart',
})(() => ({
  flex: '1 1 100%',
  flexDirection: 'column',
  display: 'flex',
  overflow: 'auto',
}))

export const LayoutScrollablePart = forwardRef(
  (props: BoxProps, ref: React.Ref<HTMLDivElement> | null) => {
    return <StyledScrollablePart ref={ref} {...props} />
  }
)

LayoutScrollablePart.displayName = 'LayoutScrollablePart'
