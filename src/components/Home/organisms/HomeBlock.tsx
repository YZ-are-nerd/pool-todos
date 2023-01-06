import HomeBlockHeader from '../molecules/HomeBlockHeader'
import HomeBlockBody from '../molecules/HomeBlockBody'

const HomeBlock = () => {
    const title = 'Здесь найдете свои папки'
    return (
      <div className='w-full h-fit lg:h-64 shrink-0 mx-auto flex flex-col gap-3'>
          <HomeBlockHeader title={title} link='/rooms' />
          <HomeBlockBody/>
      </div>
    )
}

export default HomeBlock