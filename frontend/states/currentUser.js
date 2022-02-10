import { atom } from 'recoil'

export const currentUserState = atom({
  key: 'currentUser',
  default: undefined
})
