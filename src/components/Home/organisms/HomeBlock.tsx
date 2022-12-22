import HomeBlockHeader from '../molecules/HomeBlockHeader'
import HomeBlockBody from '../molecules/HomeBlockBody'

const HomeBlock = () => {
    const title = 'Здесь найдете свои комнаты'
  return (
    <div className='w-full h-fit lg:h-1/3 shrink-0 flex flex-col gap-3'>
        <HomeBlockHeader title={title} />
        <HomeBlockBody/>
    </div>
  )
}

export default HomeBlock