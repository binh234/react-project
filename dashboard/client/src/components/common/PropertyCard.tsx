import { Place } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import {
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
  CardActionArea,
  Grid,
} from '@mui/material'
import { IKContext, IKImage } from 'imagekitio-react'

import { PropertyCardProps } from '../../interfaces/property'

const PropertyCard = ({ id, title, location, price, photo }: PropertyCardProps) => {
  return (
    <Grid item xs={12} sm={6} lg={4} xl={3}>
      <Card component={Link} to={`show/${id}`} sx={{textDecoration: 'none'}}>
        <CardActionArea>
          <IKContext urlEndpoint="https://ik.imagekit.io/sk5wks3z1">
            <IKImage
              path={photo}
              loading="lazy"
              lqip={{ active: true }}
              style={{ width: '100%', height: '210px', objectFit: 'cover', borderRadius: '12px' }}
            />
          </IKContext>
          <CardContent sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '12px'}}>
            <Stack direction="column" spacing={1}>
              <Typography variant="h6">{title}</Typography>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <Place color="primary" fontSize="small" />
                <Typography variant='body2' sx={{color: '#808191'}}>{location}</Typography>
              </Stack>
            </Stack>
            <Box px={1.5} py={0.5} borderRadius={1} bgcolor="#dadefa" height="fit-content">
              <Typography variant='subtitle2'>${price}</Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default PropertyCard
