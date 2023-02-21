import { Box } from '@mui/material'
import React from 'react'

const Rightbar = () => {
  return (
    <Box flex={2} p={2} sx={{display: {xs: "none", "md": "block"}}} bgcolor="lightblue">Rightbar</Box>
  )
}

export default Rightbar