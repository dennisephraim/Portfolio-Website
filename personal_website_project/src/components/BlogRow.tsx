"use client"

import { useState } from "react"
import gsap from "gsap"
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import Flip from "gsap/Flip"
gsap.registerPlugin(useGSAP, Flip);

const tagsColorMap: Record<string, string> = {
  "update": "bg-emerald-400",
  "plan": "bg-fuchsia-400",
  "progress": "bg-yellow-400",
  "class": "bg-red-400",
}

export default function Blogrow({header, content, timestamp, tags}: {header: string, content: string, timestamp: string, tags: string[]}) {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const container = useRef<HTMLDivElement>(null);

  const date = new Date(timestamp)
  const day = date.toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  });

  const {contextSafe} = useGSAP(() => {

  }, { scope: container });

  const onBlogClick = contextSafe(() => {
    setIsOpen((prev) => !prev)
	  gsap.fromTo('#blog-modal', { opacity: 0 }, { opacity: 1, duration: 1, ease: "power1.out" });
  });
  
  return (
    <div className="flex flex-col bg-mint-500 p-2 rounded-md">
      <div 
        id="blog-row"
        onClick={onBlogClick} 
        className="cursor-pointer text-sm"
      >
        <h1 className="text-base">{header}</h1>
        <p className="text-gray-400 flex-1 truncate">{content}</p>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-x-1">
            {tags.map((tag, index) => (
              <span key={index} className={`items-center text-xs ${tagsColorMap[tag]} text-white px-1 rounded-md`}>
                {tag}
              </span>
            ))}
          </div>
          <h2>{day}</h2>
        </div>        
      </div>
      
      {isOpen && 
        <div 
          id="blog-modal"
          className={`fixed inset-0 z-60 flex backdrop-blur-lg h-full w-full items-center justify-center`}
          onClick={onBlogClick}
        >
          <div 
            id="blog-modal-content"
            className="bg-mint-500 p-6 h-[80%] overflow-y-auto text-white scrollbar-thumb-blue-400 scrollbar-track-slate-950 scrollbar-thin scroll-smooth rounded-2xl shadow-lg w-[60%] max-w-[100%]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-lg text-center">{header}</h1>
              <button
                onClick={onBlogClick}
                className="text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>
            <p style={{whiteSpace: "pre-wrap"}}>{content}</p>
          </div>
        </div>
      }
    </div>
  )
}