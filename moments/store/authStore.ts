import {persist} from 'zustand/middleware'
import {create} from 'zustand'
import { BASE_URL } from '@/utils'
import axios from 'axios'

const authStore = (set: any) => ({
  userProfile: null,
  addUser: (user: any) => set({userProfile: user}),
  removeUser: () => set({userProfile: null}),
  fetchAllUser: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`)
  }
})

const useAuthStore = create(
  persist(authStore, {
    name: 'auth',
  })
)

export default useAuthStore
