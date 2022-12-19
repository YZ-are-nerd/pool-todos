import React from 'react'
import HomeBlockHeader from '../atoms/HomeBlockHeader'
import HomeBlockBody from '../molecules/HomeBlockBody'

const HomeBlock = () => {
    const title = 'Здесь вы можете найти свои комнаты'
  return (
    <div className='w-full h-1/3 flex flex-col gap-3'>
        <HomeBlockHeader title={title} />
        <HomeBlockBody/>
    </div>
  )
}

export default HomeBlock