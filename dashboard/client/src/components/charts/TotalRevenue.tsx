import ReactApexChart from 'react-apexcharts'
import { Box, Typography, Stack } from '@mui/material'
import { ArrowCircleUpRounded } from '@mui/icons-material'
import { TotalRevenueOptions, TotalRevenueSeries } from './chart.config'

const TotalRevenue = () => {
  return (
    <Box
      p={4}
      flex={1}
      bgcolor="#fcfcfc"
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius={4}
    >
      <Typography variant="body1" fontWeight={600} color="#11142d">
        Total Revenue
      </Typography>
      <Stack my={4} direction="row" gap={4} flexWrap="wrap">
        <Typography variant="h2">$236,535</Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <ArrowCircleUpRounded sx={{ fontSize: 25, color: '#475be8' }} />
          <Stack direction="column">
            <Typography variant="subtitle1">0.8%</Typography>
            <Typography variant="subtitle2" color="#808191">
              Than last month
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <ReactApexChart
        series={TotalRevenueSeries}
        options={TotalRevenueOptions}
        type="bar"
        height={310}
      />
    </Box>
  )
}

export default TotalRevenue
