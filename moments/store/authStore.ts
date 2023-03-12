import {persist} from 'zustand/middleware'
import {create} from 'zustand'

const authStore = (set: any) => ({
  userProfile: null,
  addUser: (user: any) => set({userProfile: user}),
  removeUser: () => set({userProfile: null}),
})

const useAuthStore = create(
  persist(authStore, {
    name: 'auth',
  })
)

export default useAuthStore
