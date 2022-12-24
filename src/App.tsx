import { lazy, Suspense } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { Route, Routes } from "react-router-dom"
import { useRecoilValueLoadable } from "recoil";
import HomePageSkeleton from "./skeletons/pages/Home.page";
const SideBar = lazy(() => import('./components/global/sidebar/templates/SideBar'))
const AuthPage = lazy(() => import('./pages/auth.page'))
const HomePage = lazy(() => import('./pages/home.page'))
const RoomPage = lazy(() => import('./pages/room.page'))
const RoomsPage = lazy(() => import('./pages/rooms.page'))
import { User } from "./store/User";

const App = () => {
  const user = useRecoilValueLoadable(User)
  if (user.state === 'loading') {
    return <div className="w-screen h-screen flex items-center justify-center">
      <BiLoaderAlt className="animate-spin text-white" />
    </div>
  } else return (
      <div className="w-screen h-screen relative overflow-x-hidden flex p-2 gap-2 bg-black">
        <Suspense fallback={<></>}>
          <SideBar />
        </Suspense>
        <Routes>
          <Route path='/' element={<Suspense fallback={<HomePageSkeleton/>}><HomePage /></Suspense>} />
          <Route path='/room/:roomID' element={<Suspense fallback={<></>}><RoomPage /></Suspense>} />
          <Route path='/rooms' element={<Suspense fallback={<></>}><RoomsPage/></Suspense>} />
          <Route path='/auth' element={<AuthPage />} />
        </Routes>
      </div>
    )
}

export default App
