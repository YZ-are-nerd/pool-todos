import { Helmet } from "react-helmet"
import HomeBlock from "../components/organisms/HomeBlock"
const HomePage = () => {
  return (
    <div className="w-full h-[90.5vh] rounded-xl p-2 gap-3 flex flex-col overflow-hidden bg-neutral-900">
        <Helmet>
            <title>Домашняя комната</title>
        </Helmet>
        <HomeBlock key={1} />
    </div>
  )
}

export default HomePage