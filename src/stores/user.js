import { Auth } from '@/models';


export const userStore = (set, get) => ({
  currentUser: null,
  initalUser: async () => {
    return await get().pullUser()
  },
  pullUser: async () => {
    try {
      const res = await Auth.getCurrentUser()
      set({ currentUser: res })
      return { success: true }
    } catch (e) {
      get().resetUser();
      return { success: false }
    }
  },
  resetUser: () => {
    set({ currentUser: null })
    localStorage.removeItem('authorization');
  },
})