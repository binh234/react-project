import { useList, useGetIdentity, useShow } from '@refinedev/core'
import { useParams, useNavigate } from 'react-router-dom'
import { Typography, Box, Stack } from '@mui/material'
import { ChatBubble, Delete, Edit, Phone, Place, Star } from '@mui/icons-material'
import { CustomButtom } from '../../components'

export const PropertyShow: React.FC = () => {
  const navigate = useNavigate()

  return <MuiShowInferencer />
}
