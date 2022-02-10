import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useSetRecoilState, RecoilRoot } from 'recoil';
import { useRecoilValue } from 'recoil';

import { getMe } from '../lib/auth'
import { currentUserState } from '../states/currentUser';

function AppInit() {
  const router = useRouter()
  const [cookies] = useCookies(["access_token"])
  const setCurrentUser = useSetRecoilState(currentUserState);
  
  useEffect(() => {
    async function fetchData() {
      if (router.pathname === "/login") return
      if (router.pathname === "/logout") return
  
      const access_token = cookies.access_token
      if (!access_token) {
        setCurrentUser(null)
        return router.push('/login')        
      }
      const response = await getMe(access_token)
      if (response.status !== 200) {
        setCurrentUser(null)
        return router.push('/login')
      }
      const responseData = await response.json()
      setCurrentUser(responseData)
    }
    fetchData()
  })
  
  return null
}

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <AppInit />
      <Component { ...pageProps } />
    </RecoilRoot>
  )
}

export default MyApp
