import { authStore } from '@/stores/auth'
import { userStore } from '@/stores/user'
import { imageStore } from '@/stores/image'
import { listStore } from '@/stores/list'
import { create } from 'zustand'


const loadingStore = set => ({
  loading: false,
  setLoading: loading => set({ loading })
})

export const useStore = create((...a) => ({
  ...loadingStore(...a),
  ...authStore(...a),
  ...userStore(...a),
  ...imageStore(...a),
  ...listStore(...a)
}))


