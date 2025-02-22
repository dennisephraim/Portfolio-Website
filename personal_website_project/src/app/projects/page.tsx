"use client"

import { useState, useEffect } from "react"

export default function Projects() {
    const [dat, setDat] = useState({})

    useEffect(() => {
        const fetchProfile = async () => {
            const token = sessionStorage.getItem("myIdToken")
            const res = await fetch("https://getprofile-auu3gfb5pa-uc.a.run.app/getProfile", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
          
            if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.statusText}`);
            }
          
            const data = await res.json();
            setDat(data)
            
        }
        fetchProfile()
    }, [])
    console.log("Profile data:", dat);
    return <div>All Projects {}</div>
}