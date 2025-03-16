"use client"

import { useState } from "react"

export default function Blogrow({header, content, timestamp}: {header: string, content: string, timestamp: string}) {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)

  const date = new Date(timestamp)
  const time = date.toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: false, })
  const day = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);  

  const firstline: string = content.split('.')[0]
  // console.log(firstline)
  const handleClick = () => {
    setIsOpen(() => !isOpen)
  }
  
  return (
    <div className="flex flex-col bg-custom_blue_shade bg-opacity-80 border-slate-500 first:border-b-2 border-b-2 last:border-b-0 p-3 first:rounded-t-md last:rounded-b-md">
      <div onClick={handleClick} className="cursor-pointer">
        <div className="flex flex-row justify-between">
          <h1 className="text-lg">{header}</h1>
          <h2>{day} | {time}</h2>
        </div>
        <div>
            <p>{firstline}...</p>
        </div>
      </div>
      
      {isOpen && 
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-black p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
            <div className="flex justify-end">
              <button
                onClick={handleClick}
                className="text-gray-600 hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="overflow-y-auto max-h-80">
              <h1 className="text-lg text-center pb-2">{header}</h1>
              <p>{content}</p>
            </div>
          </div>
        </div>
      }
    </div>
  )
}