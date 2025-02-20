'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
    const pathname = usePathname()
    const isActive = (href: string) => href === pathname

    return (
      <div className="w-full border border-gray-600 border-l-0 border-r-0 border-t-0 mb-10">
        <div className="sticky py-5 flex justify-between w-[70%] mx-auto">
            <Link href="/">
                NETTEN
            </Link>
            <ul className="flex gap-x-4 text-gray-400">
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
      </div>
    )
}