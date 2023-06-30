import {
  Box,
  Typography,
  TextField,
  Stack,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from '@mui/material'
import { TextareaAutosize } from '@mui/base'
import { FormProps } from '../../interfaces/common'
import CustomButtom from './CustomButtom'

const Form = ({
  type,
  register,
  onFinish,
  onFinishHandler,
  formLoading,
  handleSubmit,
  handleImageChange,
  propertyImage,
}: FormProps) => {
  return (
    <Box>
      <Typography variant="h4" color="#11142d">
        {type} a Property
      </Typography>

      <Box mt={2} borderRadius={4} padding={4} bgcolor="#fcfcfc">
        <form
          style={{
            marginTop: '16px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <TextField
            label="Property name"
            fullWidth
            required
            color="info"
            variant="outlined"
            {...register('title', { required: true })}
          />
          <TextField
            multiline
            minRows={5}
            label="Description"
            placeholder="Write description"
            fullWidth
            required
            color="info"
            variant="outlined"
            {...register('description', { required: true })}
          />
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, sm: 2}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                label="Type"
                variant="outlined"
                color="info"
                displayEmpty
                required
                defaultValue="apartment"
                {...register('property', { required: true })}
              >
                <MenuItem value="apartment">Apartment</MenuItem>
                <MenuItem value="villa">Villa</MenuItem>
                <MenuItem value="farmhouse">Farmhouset</MenuItem>
                <MenuItem value="condos">Condos</MenuItem>
                <MenuItem value="townhouse">Townhouse</MenuItem>
                <MenuItem value="duplex">Duplex</MenuItem>
                <MenuItem value="studio">Studio</MenuItem>
                <MenuItem value="challet">Challet</MenuItem>
              </Select>
            </FormControl>
            <TextField
              type="number"
              label="Price"
              required
              fullWidth
              color="info"
              variant="outlined"
              {...register('price', { required: true })}
            />
          </Stack>
          <TextField
            label="Location"
            fullWidth
            required
            color="info"
            variant="outlined"
            {...register('location', { required: true })}
          />
          <Stack direction="column" justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography variant="body1" color="#11142d" my={1}>
                Property photo
              </Typography>
              <Button
                component="label"
                size="small"
                sx={{
                  width: 'fit-content',
                  color: '#2ed480',
                  textTransform: 'capitalize',
                  fontSize: 16,
                }}
              >
                Upload *
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    handleImageChange(e.target.files[0])
                  }}
                />
              </Button>
            </Stack>
            <Typography variant="subtitle1" color="#808191" mb={2} sx={{ wordBreak: 'break-all' }}>
              {propertyImage?.name}
            </Typography>
            <CustomButtom
              type="submit"
              title={formLoading ? 'Submitting...' : 'Submit'}
              bgcolor="#475be8"
              color="#fcfcfc"
            />
          </Stack>
        </form>
      </Box>
    </Box>
  )
}

export default Form
