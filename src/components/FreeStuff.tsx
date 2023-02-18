import React from 'react'
import Image from 'next/image'

const FreeStuff: React.FC<{
  logo: string
  title: string
  url: string
  description: string
}> = ({ logo, title, url, description }) => {
  return (
    <div className="flex flex-row rounded">
      <Image
        src={`/assets/logos/${logo}.png`}
        alt={logo}
        width={80}
        height={80}
        style={{
          maxWidth: '100%',
          height: 'auto',
          objectFit: 'contain',
          objectPosition: 'top',
        }}
      />
      <div className="ml-4">
        <a
          href={url}
          target="_blank"
          rel="noopener"
          className="cursor-pointer rounded-lg text-lg font-bold text-indigo-800 transition-colors hover:underline dark:text-white"
        >
          {title}
        </a>
        <p className="mt-2 font-light text-slate-800 dark:text-white">
          {description}
        </p>
      </div>
    </div>
  )
}

export default FreeStuff
