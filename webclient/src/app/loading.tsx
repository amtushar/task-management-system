import React from 'react'
import Image from 'next/image';


const Loading = () => {
  const myGif = "https://task-management-system-7crt.vercel.app/loader.gif";

  return (
    <div className='flex items-center justify-center bg-white dark:bg-navy-700 h-[100vh]' >
      <Image src={myGif} alt="my gif" height={50} width={50} />
    </div>
  )
}

export default Loading
