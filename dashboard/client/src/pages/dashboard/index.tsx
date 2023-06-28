import React from 'react'
import { useList } from '@refinedev/core'
import { PieChart, PropertyReferrals, TotalRevenue, PropertyCard, TopAgent } from '../../components'
import { Box, Stack, Typography } from '@mui/material'

export const DashboardPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" color="primary">
        Dashboard
      </Typography>
      <Box mt={4} display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Properties for Sale"
          value={684}
          series={[75, 25]}
          colors={['#275be8', '#c4e8ef']}
        />
        <PieChart
          title="Properties for Rent"
          value={550}
          series={[60, 40]}
          colors={['#275be8', '#c4e8ef']}
        />
        <PieChart
          title="Total customers"
          value={5684}
          series={[75, 25]}
          colors={['#275be8', '#c4e8ef']}
        />
        <PieChart
          title="Properties for Cities"
          value={550}
          series={[75, 25]}
          colors={['#275be8', '#c4e8ef']}
        />
      </Box>

      <Stack mt={4} width="100%" direction={{xs: "column", lg: "row"}} gap={4}>
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>
    </Box>
  )
}
