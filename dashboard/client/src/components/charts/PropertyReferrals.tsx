import { Box, Typography, Stack } from '@mui/material'
import { propertyReferralsInfo } from '../../constants'

interface ProgressBarProps {
  title: string
  percentage: number
  color: string
}

const ProgressBar = ({ title, percentage, color }: ProgressBarProps) => (
  <Box width="100%">
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="body1" fontWeight={500} color="#11142d">
        {title}
      </Typography>
      <Typography variant="body1" fontWeight={500} color="#11142d">
        {percentage}%
      </Typography>
    </Stack>
    <Box mt={2} position="relative" width="100%" height="8px" borderRadius={1} bgcolor="#e4e8ef">
      <Box
        width={`${percentage}%`}
        bgcolor={color}
        position="absolute"
        height="100%"
        borderRadius={1}
      />
    </Box>
  </Box>
)

const PropertyReferrals = () => {
  return (
    <Box
      p={4}
      bgcolor="#fcfcfc"
      display="flex"
      flexDirection="column"
      borderRadius={4}
      minWidth={490}
    >
      <Typography variant="body1" fontWeight={600} color="#11142d">
        Property Referrals
      </Typography>
      <Stack my={4} direction="column" gap={4}>
        {propertyReferralsInfo.map((bar) => (
          <ProgressBar key={bar.title} {...bar} />
        ))}
      </Stack>
    </Box>
  )
}

export default PropertyReferrals
