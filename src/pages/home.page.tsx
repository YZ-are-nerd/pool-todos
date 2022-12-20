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
    <div className="w-full relative h-full rounded-xl p-2 gap-3 flex flex-col overflow-hidden bg-neutral-900">
        <Helmet>
            <title>Домашняя комната</title>
        </Helmet>
        <HomeBlock key={1} />
    </div>
  )
}

export default HomePage