import React, { forwardRef, PropsWithChildren } from 'react'
import { Box, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledLayout = styled(Box, {
  name: 'StyledLayout',
})(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  width: '100%',
  height: '100%',
}))

export const Layout = forwardRef(
  (props: PropsWithChildren, ref: React.Ref<HTMLDivElement> | null) => {
    const { children, ...rest } = props

    return (
      <StyledLayout component='main' {...rest} ref={ref}>
        <Stack
          sx={{
            width: '100%',
            position: 'relative',
            inset: '0 0 0 0',
            height: '100%',
            overflow: 'auto',
          }}
        >
          {children}
        </Stack>
      </StyledLayout>
    )
  }
)

Layout.displayName = 'Layout'
