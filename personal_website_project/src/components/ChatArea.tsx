"use client"

import { useState, useEffect, Key } from "react";
import { Avatar } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Message from "./Message";
import { useSession } from "@/context/context";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore"
import { db } from "@/firebase/config";

export default function ChatArea({person, adminUserID }: {person: {name: string, title: string, ID: string, profile_picture: string}, adminUserID: string | undefined}) {
    const {userId, profile_picture} = useSession();
    const messagesID = adminUserID === userId ? `${person.ID}-${userId}` : `${userId}-${person.ID}`

    const [ message, setMessage ] = useState({message: "", senderId: userId, receiverId: person.ID, timestamp: ""});
    const [ messages, setMessages ] = useState<any>([]);

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage({message: e.target.value, senderId: userId, receiverId: person.ID, timestamp: ""});
    }

    useEffect(() => {
        if (!(userId && person.ID && adminUserID)) return;
    
        const messagesRef = collection(db, "conversations", messagesID, "messages")

        const q = query(messagesRef, orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const updatedMessages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages(updatedMessages);
        });
    
        return () => unsubscribe();
                
    }, [ messagesID ])

    const handleSendMessage = async () => {
        try {
            const token = sessionStorage.getItem("myIdToken");
            const timestamp = new Date()
            const isAdminUserSender = userId === adminUserID;
            
            const res = await fetch("https://addmessage-auu3gfb5pa-uc.a.run.app", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    message: message.message,
                    senderId: message.senderId,
                    receiverId: message.receiverId,
                    timestamp: timestamp,
                    isAdminUserSender: isAdminUserSender,
                }),
            })
            if (!res.ok) {
                throw new Error(`Failed to send message: ${res.statusText}`);
            }
        } catch (error) {
            console.error(error);
        }
        setMessage({message: "", senderId: "", receiverId: "", timestamp: ""});
    }
    
    return (
        <div>
            {!person.name && 
                <div className="flex justify-center items-center h-full">
                    <p className="text-sm text-gray-400">Welcome to the Chat Area, Click on a profile to begin a conversation!</p>
                </div>
            }
            {person.name && 
            <div className="h-100 grid grid-rows-[auto_1fr_auto]">
                <div className="border-b-4 border-slate-950 p-3 flex justify-end">
                    <Avatar src={person.profile_picture} alt="avatar"/>
                </div>
                <div className="pr-4 pl-4 overflow-auto scrollbar-thumb-blue-400 scrollbar-track-slate-950 scrollbar-thin scroll-smooth">
                    <div className="flex items-center justify-center">
                        {messages.length === 0 && <p className="text-sm text-gray-400">
                            Start a converstion with {person.name.split(" ")[0]} below!
                        </p>}
                    </div>
                    <div className="flex flex-col">
                        {messages.map((message: { receiverId: string, senderId: string | null; message: string; }, index: Key | null | undefined) => (
                            message.senderId === userId ?
                            (<Message key={index} reversed={true} message={message.message} profile_picture={profile_picture!}/>) :
                            (<Message key={index} message={message.message} profile_picture={person.profile_picture}/>)
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
            }
            </div>
    )
}