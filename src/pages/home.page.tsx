import { useEffect } from "react"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import UserBar from "../components/global/mobilebar/molecules/UserBar"
import HomeBlock from "../components/Home/organisms/HomeBlock"
import Statisctics from "../components/Statistic/template/Statisctics"
import { User } from "../store/User"
const HomePage = () => {
  const user = useRecoilValue(User)
  const navigate = useNavigate()
  useEffect(() => {
    console.log('home', user);
    if (!user) navigate('/auth');
  },[user])
  return (
    <div className="w-full h-full max-h-screen rounded-xl p-2 gap-3 flex flex-col">
        <Helmet>
            <title>Домашняя комната</title>
        </Helmet>
        <div className="max-w-7xl w-full lg:h-full h-5/6 mx-auto gap-6 flex flex-col">
          <div className="w-full h-fulll flex flex-col">
            <HomeBlock key={1} />
          </div>
          <div className="w-full lg:h-2/3 h-1/2 flex items-centerq">
            <Statisctics />
          </div>
        </div>
        <UserBar />
    </div>
  )
}

export default HomePage