'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Hamburger from 'hamburger-react'
import NLogo from "@/assets/netten type 2 light.svg"

export default function Navbar() {
    const pathname = usePathname()
    const isActive = (href: string) => href === pathname
    const [ isOpen, setOpen ] = useState(false)

    return (
      <div className="w-full sticky top-0 start-0 border backdrop-blur-md border-gray-600 border-l-0 border-r-0 border-t-0 mb-10 p-3 md:py-6 ">
        <div className="justify-between w-[85%] lg:w-[70%] mx-auto flex items-center">
            <Link href="/" >
                <NLogo className="w-32 h-10 text-blue-400" />
            </Link>
            <div className="hidden md:flex">
                <ul className="flex gap-x-6 text-gray-400 font-semibold">
                    <li>
                        <Link href="/about" className={`transition-all ${isActive('/about') ? 'text-blue-400' : 'hover:text-white'}`}>
                            About Me
                        </Link>
                    </li>
                    <li>
                        <Link href="/projects" className={`transition-all ${isActive('/projects') ? 'text-blue-400' : 'hover:text-white'}`}>
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog" className={`transition-all ${isActive('/blog') ? 'text-blue-400' : 'hover:text-white'}`}>
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link href="/chat" className={`transition-all ${isActive('/chat') ? 'text-blue-400' : 'hover:text-white'}`}>
                            Chat
                        </Link>
                    </li>
                    <li>
                        <Link href="/solo_leveling" className={`transition-all ${isActive('/solo_leveling') ? 'text-blue-400' : 'hover:text-white'}`}>
                            Solo Leveling
                        </Link>
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
                        <Link href="/about" onClick={() => setOpen(false)} className={`transition-all ${isActive('/about') ? 'text-blue-400' : 'hover:text-white'}`}>
                            About Me
                        </Link>
                    </li>
                    <li>
                        <Link href="/projects" onClick={() => setOpen(false)} className={`transition-all ${isActive('/projects') ? 'text-blue-400' : 'hover:text-white'}`}>
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog" onClick={() => setOpen(false)} className={`transition-all ${isActive('/blog') ? 'text-blue-400' : 'hover:text-white'}`}>
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link href="/chat" onClick={() => setOpen(false)} className={`transition-all ${isActive('/chat') ? 'text-blue-400' : 'hover:text-white'}`}>
                            Chat
                        </Link>
                    </li>
                    <li>
                        <Link href="/solo_leveling" onClick={() => setOpen(false)} className={`transition-all ${isActive('/solo_leveling') ? 'text-blue-400' : 'hover:text-white'}`}>
                            Solo Leveling
                        </Link>
                    </li>
                </ul>
            }
        </div>
      </div>
    )
}