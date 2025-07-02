'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Hamburger from 'hamburger-react'
import NLogo from "@/assets/netten_logo.svg"
import CLogo from "@/assets/netten_logo2.svg"
import DLogo from "@/assets/netten_logo1.svg"
import gsap from "gsap"
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import DrawSVGPlugin from "gsap/DrawSVGPlugin"
import AnimatedLink from "./AnimatedLink"

gsap.registerPlugin(DrawSVGPlugin, useGSAP); 

export default function Navbar() {
    const pathname = usePathname()
    const isActive = (href: string) => href === pathname
    const [ isOpen, setOpen ] = useState(false)
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
	    gsap.from('.netten_logo_svg__fn, .netten_logo_svg__sn, .netten_logo_svg__fe, .netten_logo_svg__se, .netten_logo_svg__ft, .netten_logo_svg__st', {duration:1.5, drawSVG: "0 ", stagger: 0.2, ease: "power1.inOut"})
    },{ scope: container });

    return (
      <div ref={container} className="w-full z-50 sticky top-0 start-0 backdrop-blur-md mb-10 p-3 md:py-6 ">
        <div className="justify-between w-[85%] lg:w-[70%] mx-auto flex items-center">
            <AnimatedLink href="/" >
                <NLogo className="w-32 h-10 text-blue-400" />
            </AnimatedLink>
            <div className="hidden md:flex">
                <ul className="flex gap-x-6 text-gray-400 font-semibold">
                    <li>
                        <AnimatedLink href="/about" className={`transition-all ${isActive('/about') ? 'text-blue-400' : 'hover:text-white'}`}>
                            About Me
                        </AnimatedLink>
                    </li>
                    <li>
                        <AnimatedLink href="/projects" className={`transition-all ${isActive('/projects') ? 'text-blue-400' : 'hover:text-white'}`}>
                            Projects
                        </AnimatedLink>
                    </li>
                    <li>
                        <AnimatedLink href="/blog" className={`transition-all ${isActive('/blog') ? 'text-blue-400' : 'hover:text-white'}`}>
                            Blog
                        </AnimatedLink>
                    </li>
                    <li>
                        <AnimatedLink href="/chat" className={`transition-all ${isActive('/chat') ? 'text-blue-400' : 'hover:text-white'}`}>
                            Chat
                        </AnimatedLink>
                    </li>
                    <li>
                        <AnimatedLink href="/solo_leveling" className={`transition-all ${isActive('/solo_leveling') ? 'text-blue-400' : 'hover:text-white'}`}>
                            Solo Leveling
                        </AnimatedLink>
                    </li>
                </ul>
            </div>
            <div className="md:hidden flex">
                <Hamburger toggled={isOpen} toggle={setOpen} size={24}/>
            </div>
        </div>
        <div className="w-[85%] mx-auto">
            {isOpen && 
                <ul className="flex flex-col gap-y-4 text-gray-400">
                    <li>
                        <AnimatedLink href="/about" onClick={() => setOpen(false)} className={`transition-all ${isActive('/about') ? 'text-blue-400' : 'hover:text-white'}`}>
                            About Me
                        </AnimatedLink>
                    </li>
                    <li>
                        <AnimatedLink href="/projects" onClick={() => setOpen(false)} className={`transition-all ${isActive('/projects') ? 'text-blue-400' : 'hover:text-white'}`}>
                            Projects
                        </AnimatedLink>
                    </li>
                    <li>
                        <AnimatedLink href="/blog" onClick={() => setOpen(false)} className={`transition-all ${isActive('/blog') ? 'text-blue-400' : 'hover:text-white'}`}>
                            Blog
                        </AnimatedLink>
                    </li>
                    <li>
                        <AnimatedLink href="/chat" onClick={() => setOpen(false)} className={`transition-all ${isActive('/chat') ? 'text-blue-400' : 'hover:text-white'}`}>
                            Chat
                        </AnimatedLink>
                    </li>
                    <li>
                        <AnimatedLink href="/solo_leveling" onClick={() => setOpen(false)} className={`transition-all ${isActive('/solo_leveling') ? 'text-blue-400' : 'hover:text-white'}`}>
                            Solo Leveling
                        </AnimatedLink>
                    </li>
                </ul>
            }
        </div>
      </div>
    )
}