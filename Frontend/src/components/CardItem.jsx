import React from 'react'

const CardItem = ({key , card}) => {
  return (
    <div className=' w-5/12 h-32 p-4 rounded-lg  flex flex-col justify-center items-start gap-2 bg-gray-200 text-black'>
        <span>{card.title}</span>
        <p>{card.description}</p>
    </div>
  )
}

export default CardItem