import { Auth } from '@/models'

export const authStore = (set, get) => ({
  username: '',
  password: '',
  setUsername: username => set({ username }),
  setPassword: password => set({ password }),
  login: async () => {
    const res = await Auth.login(get().username, get().password)
    if (!res?.success) {
      return res
    }
    localStorage.setItem('authorization', res?.data?.authorization);
    return await get().pullUser()
  },
  register: async () => {
    const res = await Auth.register(get().username, get().password)
    if (!res?.success) {
      return res
    }
    localStorage.setItem('authorization', res?.data?.authorization);
    return await get().pullUser()
  },
  logout: () => {
    get().resetUser()
  }
})