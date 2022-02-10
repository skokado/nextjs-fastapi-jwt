import { useRouter } from 'next/router';

import { useRecoilValue } from 'recoil';
import { currentUserState } from '../states/currentUser';

const App = () => {
  const router = useRouter()
  const currentUser = useRecoilValue(currentUserState)

  const handleLogout = () => {
    router.push('/logout')
  }
  
  return <div>
    { currentUser ? (
      <h1>Hello {currentUser.username}-san!</h1>
    ) : "loading..." }
    <button type="button" onClick={handleLogout}>ログアウト</button>
  </div>;
};

export default App;
