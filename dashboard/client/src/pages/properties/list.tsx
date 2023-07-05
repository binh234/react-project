import { useTable } from '@refinedev/core'
import { Add } from '@mui/icons-material'
import { Box, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { PropertyCard, CustomButtom, Loader } from '../../components'
import { useMemo } from 'react'
import { propertyTypes } from '../../constants'

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

  const currentPrice = sorters.find((item) => item.field === 'price')?.order
  const toggleSort = (field: string) => {
    setSorters([{ field, order: currentPrice === 'asc' ? 'desc' : 'asc' }])
  }

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) => ('field' in item ? item : []))

    return {
      title: logicalFilters.find((item) => item.field === 'title')?.value || '',
      propertyType: logicalFilters.find((item) => item.field === 'propertyType')?.value || '',
    }
  }, [filters])

  if (isLoading) {
    return <Loader text="Loading..." />
  }
  if (isError) return <Typography variant="h4">Error...</Typography>

  return (
    <Box>
      <Box mt={4}>
        <Stack direction="column" width="100%">
          <Typography variant="h4">
            {allProperties.length ? 'All Properties' : 'There are no properties'}
          </Typography>
          <Box
            mb={2}
            mt={3}
            display="flex"
            width="84%"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap" gap={2} mb={{ xs: 4, sm: 0 }}>
              <CustomButtom
                title={`Sort price ${currentPrice === 'asc' ? '↑' : '↓'}`}
                handleClick={() => toggleSort('price')}
                bgcolor="#475be8"
                color="#fcfcfc"
              />
              <TextField
                variant="outlined"
                color="info"
                placeholder="Search by title"
                value={currentFilterValues.title}
                onChange={(e) => {
                  setFilters([
                    {
                      field: 'title',
                      operator: 'contains',
                      value: e.currentTarget.value ? e.currentTarget.value : undefined,
                    },
                  ])
                }}
              />
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ 'aria-label': 'Without label' }}
                defaultValue=""
                value={currentFilterValues.propertyType}
                onChange={(e) => {
                  setFilters(
                    [
                      {
                        field: 'propertyType',
                        operator: 'eq',
                        value: e.target.value ? e.target.value : undefined,
                      },
                    ],
                    'replace'
                  )
                }}
              >
                <MenuItem value="">"All</MenuItem>
                {propertyTypes.map((type) => (
                  <MenuItem key={type} value={type.toLowerCase()}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>

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
      {allProperties.length > 0 && (
        <Stack direction="row" spacing={2} mt={3}>
          <CustomButtom
            title="Previous"
            handleClick={() => setCurrent((prev) => prev - 1)}
            bgcolor="#475be8"
            color="#fcfcfc"
            disabled={current <= 1}
          />
          <Box display={{ xs: 'hidden', sm: 'flex' }} alignItems="center" gap={1}>
            Page{' '}
            <strong>
              {current} of {pageCount}
            </strong>
          </Box>
          <CustomButtom
            title="Previous"
            handleClick={() => setCurrent((prev) => prev + 1)}
            bgcolor="#475be8"
            color="#fcfcfc"
            disabled={current === pageCount}
          />
          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ 'aria-label': 'Without label' }}
            defaultValue={10}
            onChange={(e) => setPageSize(e.target.value ? Number(e.target.value) : 10)}
          >
            {[10, 20, 30, 40].map((size) => (
              <MenuItem key={size} value={size}>
                Show {size}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      )}
    </Box>
  )
}
