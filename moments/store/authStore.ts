import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import { BASE_URL } from '@/utils'
import axios from 'axios'
import { getFutureDateTime } from '@/utils/helpers'
import { EXPIRE_TIME, MAX_SUGGEST_RESULT } from '@/utils/config'

const authStore = (set: any) => ({
  userProfile: null,
  suggestedUsers: [],
  lastId: '',
  expiresAt: new Date(),
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
  fetchSuggestedUsers: async (lastId?: string) => {
    let { data } = await axios.get(`${BASE_URL}/api/suggested-user`, {
      params: { maxResults: MAX_SUGGEST_RESULT, lastId: lastId },
    })
    let _lastId = lastId
    if (data.length === 0 && lastId) {
      const response = await axios.get(`${BASE_URL}/api/suggested-user`, {
        params: { maxResults: MAX_SUGGEST_RESULT },
      })
      data = response.data
    }
    if (data.length > 0) {
      if (data.length <= MAX_SUGGEST_RESULT) {
        _lastId = ''
      } else {
        _lastId = data[data.length - 1]._createdAt
      }
    }

    set({ suggestedUsers: data, expiresAt: getFutureDateTime(EXPIRE_TIME), lastId: _lastId })
  },
})

const useAuthStore = create(
  persist(authStore, {
    name: 'auth',
  })
)

export default useAuthStore
