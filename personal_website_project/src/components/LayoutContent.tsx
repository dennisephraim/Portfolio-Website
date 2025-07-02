"use client";

import React from 'react';
import Navbar from "@/components/navbar";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar/>
      <div className="lg:w-[60%] w-[75%] md:w-[70%] mx-auto">
        {children}
      </div>
    </div>
  );
} 