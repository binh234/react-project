import { Button } from '@mui/material'
import { CustomButtonProps } from '../../interfaces/common'

const CustomButtom = ({
  type,
  title,
  bgcolor,
  color,
  fullWidth,
  icon,
  disabled,
  handleClick,
}: CustomButtonProps) => {
  return (
    <Button
      sx={{
        flex: fullWidth ? 1 : 'unset',
        padding: '10px 12px',
        width: fullWidth ? '100%' : 'fit-content',
        minWIdth: 130,
        backgroundColor: bgcolor,
        color: color,
        fontSize: 16,
        fontWeight: 600,
        gap: '10px',
        textTransform: 'capitalize',
        '&:hover': {
          opacity: 0.9,
          backgroundColor: bgcolor
        }
      }}
      onClick={handleClick}
    >
      {icon}
      {title}
    </Button>
  )
}

export default CustomButtom
