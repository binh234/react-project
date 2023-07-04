import { useTable } from '@refinedev/core'
import { Add } from '@mui/icons-material'
import { Box, Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { PropertyCard, CustomButtom, Loader } from '../../components'

export const PropertyList = () => {
  const navigate = useNavigate()

  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorters,
    setSorters,
    filters,
    setFilters,
  } = useTable()
  const allProperties = data?.data ?? []

  if (isLoading) {
    return <Loader text="Loading..." />
  }
  if (isError) return <Typography variant="h4">Error...</Typography>

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
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

      <Grid container spacing={2} mt={2}>
        {allProperties.map((property) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            location={property.location}
            price={property.price}
            photo={property.photo}
          />
        ))}
      </Grid>
    </Box>
  )
}
