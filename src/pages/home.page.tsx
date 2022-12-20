import { useEffect } from "react"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import HomeBlock from "../components/organisms/HomeBlock"
import { User } from "../store/User"
const HomePage = () => {
  const user = useRecoilValue(User)
  const navigate = useNavigate()
  useEffect(() => {
    console.log('home', user);
    if (!user) navigate('/auth');
  },[user])
  return (
    <div className="w-full relative h-full rounded-xl p-2 gap-3 flex flex-col overflow-hidden">
        <Helmet>
            <title>Домашняя комната</title>
        </Helmet>
        <HomeBlock key={1} />
        <div className="w-full h-full flex">
          <div className="w-1/3 h-full flex flex-col rounded-xl p-2 gap-2 border-2 border-neutral-800 bg-neutral-900">
              <h2 className="text-4xl font-bold">На сегодня</h2>
              <div className="w-full h-full flex flex-col"></div>
          </div>
        </div>
    </div>
  )
}

export default HomePage