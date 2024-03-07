import AuthStore from '@/stores/auth'
import UserStore from '@/stores/user'
import ImageStore from '@/stores/image'
import ListStore from '@/stores/list'
import { createContext, useContext } from 'react'

const storesContext = createContext({
  AuthStore,
  UserStore,
  ImageStore,
  ListStore
})

export const useStores = () => useContext(storesContext)