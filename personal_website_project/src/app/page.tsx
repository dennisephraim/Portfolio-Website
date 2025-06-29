"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, SplitText);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const split = new SplitText('.home-text', { type: 'chars' });
    gsap.from(split.chars, {
      x: 150,
    opacity: 0,
    duration: 1, 
    ease: "power4",
    stagger: 0.04
    });
  }, { scope: container });
  return (
    <div ref={container} className="flex flex-row justify-center items-center gap-x-5">
      <div className="relative shadow-lg rounded-3xl p-[1px] bg-gradient-to-br from-blue-500 via-indigo-500 to-fuchsia-500">
        <span className="pointer-events-none absolute inset-0 rounded-3xl bg-blue-500/30 blur-2xl"/>
        <Image
          src="/ProfilePicture.jpg"
          alt="profile"
          width={300}
          height={300}
          className="relative z-10 object-cover rounded-3xl"
          priority
        />
      </div>
      <div className="flex flex-col justify-center ml-4 home-text">
        <h1 className="text-3xl">Hello, I'm Ephraim</h1>
        <p className="mt-2 text-lg">Welcome to my personal website!</p>
        <p className="mt-2 text-base">I am a Software Engineer with a passion for building things!.</p>
        <p className="mt-2 text-base">Feel free to explore my work and connect with me!</p>
      </div>
    </div>
  )
}
