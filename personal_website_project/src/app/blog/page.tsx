"use client"

import { useState, useEffect } from "react"
import Blogrow from "@/components/BlogRow"
import { useSession } from "@/context/context";


export default function Blog() {
    const [ blogs, setBlogs ] = useState<Array<{header: string, content: string, timestamp: string,}>>([])
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    const [ postHeader, setPostHeader ] = useState<string>("");
    const [ postContent, setPostContent] = useState<string>("");
    const {role} = useSession()

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const token = sessionStorage.getItem("myIdToken")
                
                const res = await fetch("https://getblogs-auu3gfb5pa-uc.a.run.app", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });
                
                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.statusText}`);
                }
                
                const data = await res.json();
                setBlogs(() => data)
            } catch (error) {
                console.log(error)
                window.location.reload()
            }
        }
        fetchBlogs()
    }, [isPopupOpen])

    const handleButtonClick = () => {
        setIsPopupOpen(() => !isPopupOpen);
    }

    const handleInputChange = (type: string, value: string) => {
        if (type == "header") {
            setPostHeader(value);
        } else {
            setPostContent(value);
        }
    }

    const handleAddPost = async () => {
        try {
            if (postHeader == "" || postContent == "") {
                throw new Error("input values before posting");
            }
            const newDate = new Date()
            const token = sessionStorage.getItem("myIdToken")
            const res = await fetch("https://addblog-auu3gfb5pa-uc.a.run.app", {
                method: "POST",
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    header: postHeader,
                    content: postContent,
                    timestamp: newDate,
                })
            });
            
            if (!res.ok) {
                throw new Error(`Failed to add blog: ${res.statusText}`);
            }
        } catch (error) {
            console.error(error)
            console.log("Unable to post at this time, Please try again later")
        } finally {
            setIsPopupOpen(() => !isPopupOpen)
            setPostContent("")
            setPostHeader("")
        }        
    }

    
    return (
        <div>
            <div className="flex flex-row justify-between items-center mb-2">
                <h1><span className="text-blue-400 text-2xl">Welcome</span> to my <span className="text-blue-400 text-2xl">Personal Blog!</span></h1>   
                {role === "admin" && 
                    <button
                    className="bg-gradient-to-r from-blue-500 via-blue-700 to-blue-950 p-2 rounded-md text-white"
                    onClick={handleButtonClick}
                    >
                        Create New Post
                    </button>
                  
                }
            </div>
            <div>
                {blogs.length > 0 && 
                    blogs.map((blog, index) => (
                        <Blogrow key={index} header={blog.header} content={blog.content} timestamp={blog.timestamp} />
                    ))
                }
            </div>

            {isPopupOpen && (
                <div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-blue-900">Subject</label>
                        <input
                            type="text"
                            className=" text-blue-900" 
                            onChange={(event) => handleInputChange("header", event.target.value)}/>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-blue-900">Content</label>
                        <input
                            type="text" 
                            className="block w-full p-4 text-blue-900" 
                            onChange={(event) => handleInputChange("content", event.target.value)}/>
                    </div>
                    <button 
                        onClick={handleAddPost} 
                        className="bg-gradient-to-r from-blue-500 via-blue-700 to-blue-950 p-2 rounded-md text-white"
                    >
                        Post
                    </button>
                </div>
            )}
        </div>
    )
    
    
}