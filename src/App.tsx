import { Suspense } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { Route, Routes } from "react-router-dom"
import { useRecoilValueLoadable } from "recoil";
import UserAvatar from "./components/atoms/UserAvatar";
import HomePage from './pages/home.page';
import RoomPage from "./pages/room.page";
import { User } from "./store/User";

const App = () => {
  const user = useRecoilValueLoadable(User)
  if (user.state === 'loading') {
    return <div className="w-screen h-screen flex items-center justify-center">
      <BiLoaderAlt className="animate-spin text-white" />
    </div>
  } else return (
      <div className="w-screen h-screen max-h-screen inline-flex flex-col overflow-hidden p-2 gap-2 bg-black">
          <div className="w-full h-fit max-h-14 p-2 rounded-xl inline-flex items-center justify-between bg-neutral-900">
            <img className="w-10 h-10 object-fill" src="/pool/x36/pool_white.svg" alt="" />
            <UserAvatar />
          </div>
          <div className="w-full h-full flex flex-col">
            <Routes>
              <Route path='/' element={<Suspense fallback={<></>}><HomePage /></Suspense>} />
              <Route path='/room/:roomID' element={<Suspense fallback={<></>}><RoomPage /></Suspense>} />
            </Routes>
          </div>
      </div>
    )
}

export default App
