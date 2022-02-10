import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useSetRecoilState, RecoilRoot } from 'recoil';

import { currentUserState } from '../states/currentUser';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const router = useRouter()
  const setCurrentUser = useSetRecoilState(currentUserState);

  useEffect(() => {
    removeCookie("access_token")
    setCurrentUser(null)
    router.push('/login')
  })

  return null
}

export default App
