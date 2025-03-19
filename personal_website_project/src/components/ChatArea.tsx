"use client"

import { useState } from "react";
import { Avatar } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Message from "./Message";
import { useSession } from "@/context/context";

export default function ChatArea({person}: {person: {name: string, title: string, ID: string}}) {
    const {userId} = useSession();

    const [ message, setMessage ] = useState({message: "", senderId: userId, receiverId: person.ID});
    const [ messages, setMessages ] = useState<{message: string, senderId: string | null, receiverId: string}[]>([]);

    console.log(userId)
    console.log(person.ID)
    
    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage({message: e.target.value, senderId: userId, receiverId: person.ID});
    }

    const handleSendMessage = () => {
        setMessages(prevMessages => [...prevMessages, message]);
        setMessage({message: "", senderId: "", receiverId: ""});
    }
    
    return (
        <div className="h-100 grid grid-rows-[auto_1fr_auto]">
            <div className="border-b-4 border-slate-950 p-3 flex justify-end">
                <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar"/>
            </div>
            <div className="pr-4 pl-4 overflow-auto scrollbar-thumb-blue-400 scrollbar-track-slate-950 scrollbar-thin scroll-smooth">
                <div className="flex items-center justify-center">
                    {messages.length === 0 && <p className="text-sm text-gray-400">
                        Start a converstion with {person.name.split(" ")[0]} below!
                    </p>}
                </div>
                <div className="flex flex-col">
                    {messages.map((message, index) => (
                        <Message key={index} message={message.message} />
                    ))}  
                </div>
            </div>
            <div className="relative flex p-3 pt-0">
                <input
                    type="text"
                    value={message.message}
                    onChange={handleMessageChange}
                    className="rounded-md w-full p-2 placeholder-gray-400 text-white bg-slate-950 focus:outline-none text-sm focus:ring-2 focus:ring-blue-400"
                    placeholder="Type a message..."
                />
                <button
                    className={`absolute rounded bg-blue-400 text-white p-1 px-2 text-sm right-4 top-1 gap-x-2 flex items-center ${!message && "opacity-70"}`}
                    disabled={!message}
                    onClick={handleSendMessage}
                >
                    Send
                    <SendIcon fontSize="small" />
                </button>
            </div>
        </div>
    )
}