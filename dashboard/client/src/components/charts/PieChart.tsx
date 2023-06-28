import ReactApexChart from 'react-apexcharts'
import { Box, Typography, Stack } from '@mui/material'
import { PieChartProps } from '../../interfaces/chart'

const PieChart = ({ title, value, series, colors }: PieChartProps) => {
  return (
    <Box
      flex={1}
      display="flex"
      bgcolor="#fcfcfc"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      pl={3}
      py={2}
      gap={2}
      borderRadius={4}
      minHeight="110px"
      width="fit-content"
    >
      <Stack direction="column">
        <Typography variant="subtitle1" color="#808191">
          {title}
        </Typography>
        <Typography variant="h4" color="#11142d" mt={1}>
          {value}
        </Typography>
      </Stack>
      <ReactApexChart
        options={{
          chart: { type: 'donut' },
          colors,
          legend: { show: false },
          dataLabels: { enabled: false },
        }}
        series={series}
        type="donut"
        width="120px"
      />
    </Box>
  )
}

export default PieChart
