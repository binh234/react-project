import { Card, CardMedia } from '@mui/material'
import React from 'react'

const PlaylistBanner = ({snippet}) => {
  return (
    <Card display={{xs: "flex", md: "block"}}>
        <CardMedia component="img" />
    </Card>
  )
}

export default PlaylistBanner