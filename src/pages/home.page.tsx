import { useEffect } from "react"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import UserBar from "../components/global/mobilebar/molecules/UserBar"
import HomeBlock from "../components/Home/organisms/HomeBlock"
import { User } from "../store/User"
const HomePage = () => {
  const user = useRecoilValue(User)
  const navigate = useNavigate()
  useEffect(() => {
    console.log('home', user);
    if (!user) navigate('/auth');
  },[user])
  return (
    <div className="w-full h-full rounded-xl p-2 gap-3 flex flex-col">
        <Helmet>
            <title>Домашняя комната</title>
        </Helmet>
        <div className="max-w-7xl w-full h-full mx-auto gap-6 flex">
          <div className="w-full h-fulll flex flex-col">
            <HomeBlock key={1} />
          </div>
        </div>
        <UserBar />
        {/* <div className="w-full h-screen flex shrink-0 lg:pr-0 pr-1 snap-y snap-mandatory overflow-y-auto"> */}
          {/* <div className="w-full h-full flex gap-2 lg:flex-row flex-col"> */}
            {/* <Calendar/> */}
            {/* <Trash /> */}
          {/* </div> */}
        {/* </div> */}
    </div>
  )
}

export default HomePage