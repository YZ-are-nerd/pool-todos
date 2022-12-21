import { useEffect } from "react"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import Calendar from "../components/organisms/Calendar"
import HomeBlock from "../components/organisms/HomeBlock"
import Trash from "../components/organisms/Trash"
import { User } from "../store/User"
const HomePage = () => {
  const user = useRecoilValue(User)
  const navigate = useNavigate()
  useEffect(() => {
    console.log('home', user);
    if (!user) navigate('/auth');
  },[user])
  return (
    <div className="w-full relative min-h-full h-fit rounded-xl p-2 gap-3 flex flex-col overflow-hidden">
        <Helmet>
            <title>Домашняя комната</title>
        </Helmet>
        <HomeBlock key={1} />
        <div className="w-full h-full flex lg:pr-0 pr-1 snap-y snap-mandatory overflow-y-auto">
          <div className="w-full h-fit flex gap-2 lg:flex-row flex-col">
            <Calendar/>
            <Trash />
          </div>
        </div>
    </div>
  )
}

export default HomePage