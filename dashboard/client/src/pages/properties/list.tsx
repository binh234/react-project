import { useTable } from '@refinedev/core'
import { MuiListInferencer } from '@refinedev/inferencer/mui'
import { Add } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { PropertyCard, CustomButtom, Loader } from '../../components'

export const PropertyList = () => {
  const navigate = useNavigate()

  const {
    tableQueryResult: { data, isLoading, isError },
  } = useTable()
  const allProperties = data?.data ?? []

  if (isLoading) {
    return <Loader text="Loading..." />
  }
  if (isError) return <Typography variant="h4">Error...</Typography>

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" color="#11142d">
          All Properties
        </Typography>
        <CustomButtom
          title="Add property"
          handleClick={() => navigate('/properties/create')}
          bgcolor="#475be8"
          color="#fcfcfc"
          icon={<Add />}
        />
      </Stack>

      <Box mt={4} display="flex" flexWrap="wrap" gap={3}>
        {allProperties.map((property) => (
          <PropertyCard key={property._id} {...property} />
        ))}
      </Box>
    </Box>
  )
}
