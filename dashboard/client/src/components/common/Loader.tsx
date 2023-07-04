import React from 'react'
import { Stack, CircularProgress, Typography } from '@mui/material'
import { LoaderProps } from '../../interfaces/common'

const Loader = ({ text }: LoaderProps) => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{ position: 'fixed', inset: 0, zIndex: 10, background: 'rgba(0,0,0,0.6)' }}
    >
      <CircularProgress />
      <Typography variant="h5" mt={4} color="white" textAlign="center">
        {text || 'Progressing...'}
      </Typography>
    </Stack>
  )
}

export default Loader
