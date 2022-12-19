import React from 'react'
type Props = {
    title: string
}
const HomeBlockHeader: React.FC<Props> = ({title}) => {
  return (
    <h1 className="text-xl inline-block mx-auto lg:text-4xl font-bold">{title}</h1>
  )
}

export default HomeBlockHeader