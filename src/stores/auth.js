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
  register: () => {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password).then((res) => {
        localStorage.setItem('authorization', res?.authorization);
        get().pullUser(resolve, reject)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  logout: () => {
    get().resetUser()
  }
})