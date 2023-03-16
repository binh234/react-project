import {persist} from 'zustand/middleware'
import {create} from 'zustand'
import {BASE_URL} from '@/utils'
import axios from 'axios'
import {shuffle} from '@/utils/helpers'

const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [],
  suggestedUsers: [],
  addUser: (user: any) => set({userProfile: user}),
  removeUser: () => set({userProfile: null}),
  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/user`)

    set({allUsers: response.data})
  },
  fetchSuggestedUsers: async () => {
    const {data} = await axios.get(`${BASE_URL}/api/suggested-user`, {
      params: {maxResults: 50},
    })
    shuffle(data)

    set({suggestedUsers: data})
  },
})

const useAuthStore = create(
  persist(authStore, {
    name: 'auth',
  })
)

export default useAuthStore
