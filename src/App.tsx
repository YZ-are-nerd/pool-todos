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
            <Routes>
              <Route path='/' element={<Suspense fallback={<></>}><HomePage /></Suspense>} />
              <Route path='/room/:roomID' element={<Suspense fallback={<></>}><RoomPage /></Suspense>} />
            </Routes>
      </div>
    )
}

export default App
