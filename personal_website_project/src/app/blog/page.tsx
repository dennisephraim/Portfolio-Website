"use client"

import { useState, useEffect } from "react"
import Blogrow from "@/components/BlogRow"


export default function Blog() {
    const [ blogs, setBlogs ] = useState({})
    useEffect(() => {
        const fetchBlogs = async () => {
            const token = sessionStorage.getItem("myIdToken")
            
            const res = await fetch("https://getblogs-auu3gfb5pa-uc.a.run.app", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            
            if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.statusText}`);
            }
            
            const data = await res.json();
            setBlogs(data)
        }
        fetchBlogs()
    }, [])
    console.log(blogs)

    return (
        <>
            <h1>Welcome to my Personal Blog!</h1>
            <Blogrow header="HEADER TEST" content="just testing my content" date="2-27-2025" time="20:00"/>
        </>
    )
}