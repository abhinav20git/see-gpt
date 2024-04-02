import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className="pt-[15%] px-24 absolute bg-gradient-to-r from-black aspect-video w-screen text-white">
      <h1 className="text-5xl font-bold ">{title}</h1>
      <p className="py-6 w-1/3 text-lg ">{overview}</p>
      <div className=' '>
        <button className='p-4 text-xl bg-white px-10 text-black rounded-lg hover:bg-opacity-80'> ▶ Play</button>
        <button className='p-4 mx-2 text-xl bg-gray-500 px-10 text-white rounded-lg bg-opacity-50'>ℹ️ More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle;