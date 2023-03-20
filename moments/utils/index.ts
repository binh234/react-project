import axios from 'axios'
// import { generateToken } from '@/pages/api/auth/index'
// import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const createOrGetUser = async (response: any, addUser: any) => {
  const decoded: { name: string; picture: string; sub: string } = jwtDecode(response.credential)

  const { name, picture, sub } = decoded

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  }

  await axios.post(`${BASE_URL}/api/auth`, user)
  // // Generate JWT token for logged in user
  // const authToken = generateToken(user)

  // Store auth token in cookies for later use
  // Cookies.set("auth-token", authToken, { expires: 7 })
  addUser(user)
}
