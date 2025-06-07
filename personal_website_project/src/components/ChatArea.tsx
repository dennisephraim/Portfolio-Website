"use client"

import { useState, useEffect, useRef } from "react";
import SendIcon from '@mui/icons-material/Send';
import Message from "./Message";
import { useSession } from "@/context/context";
import { collection, query, onSnapshot, orderBy, doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase/config";
import ChatProfile from "./ChatProfile";
import { Avatar, Button, TextField } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { green } from "@mui/material/colors"

interface Message {
    id: string;
    message: string;
    senderId: string;
    receiverId: string;
    timestamp: string;
  }

export default function ChatArea({showEdit, showWelcome, changePerson, person, adminUserID }: {showEdit: boolean, showWelcome: boolean, changePerson?: ({name, title, ID, profile_picture, edit, welcome}: {name: string, title: string, ID: string, profile_picture: string, edit: boolean, welcome: boolean}) => void, person: {name: string, title: string, ID: string, profile_picture: string}, adminUserID: string | undefined}) {
    const {userId, profile_picture, name, title} = useSession();
    const messagesID = adminUserID === userId ? `${person.ID}-${userId}` : `${userId}-${person.ID}`

    const [ message, setMessage ] = useState({message: "", senderId: userId, receiverId: person.ID, timestamp: ""});
    const [ messages, setMessages ] = useState<Message[]>([]);

    const [cname, setName] = useState("")
    const [ctitle, setTitle] = useState("")
    const bottomRef = useRef<HTMLDivElement>(null);
    

    async function handleSave() {
        try {
            if (!userId) return
            const userRef = doc(db, 'users', userId)
            await updateDoc(userRef, {
                name:  cname.trim()  || 'Anonymous',
                title: ctitle.trim() || 'Anonymous',
            })
            changePerson && changePerson({name: "", title: "", ID: "", profile_picture:"", edit: false, welcome: true})
        } catch (err) {
            console.error('Failed to update profile:', err)
        }
    }

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage({message: e.target.value, senderId: userId, receiverId: person.ID, timestamp: ""});
    }

    useEffect(() => {
        setName(name  ?? '')
        setTitle(title ?? '')
    }, [name, title])

    useEffect(() => {
        if (!(userId && person.ID && adminUserID)) return;
    
        const messagesRef = collection(db, "conversations", messagesID, "messages")
        const q = query(messagesRef, orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const updatedMessages = snapshot.docs.map((doc) => {
                const data = doc.data() as Omit<Message, "id">;
                return {id: doc.id, ...data};
            });
            setMessages(updatedMessages);
        });
    
        return () => unsubscribe();
    }, [ messagesID ])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async () => {
        try {
            if (!(person.ID && userId && message.message)) {
                alert("Please type a message")
                return
            }

            if (!message.message.trim()) {
                setMessage(
                    (prev) => ({...prev, message: ""})
                )
                return;
            }
            
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
    const avatarSrc = profile_picture && profile_picture !== "none" ? profile_picture : undefined;
    
    return (
        <div>
            {showWelcome && 
                <div className="flex justify-center items-center h-full">Welcome to the Chat Area</div>
            }
            {showEdit && 
                <div className="flex flex-col items-center gap-6 h-full p-8 text-white">
                    <h1 className="text-md">Edit Profile</h1>
                    <Avatar
                        src={avatarSrc}
                        alt="Avatar"
                        sx={{ width: 96, height: 96, bgcolor: green[400] }}
                    />
                    <div className="flex flex-col w-full max-w-sm gap-4 ">
                        <TextField
                            label="Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={cname}
                            onChange={e => setName(e.target.value)}
                            slotProps={{
                                inputLabel: {
                                    sx: { color: '#FFFFFF' },
                                },
                                input: {
                                    sx: {
                                        color: '#ffffff',
                                    },
                                },
                            }}
                        />
                        <TextField
                            label="Title"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={ctitle}
                            onChange={e => setTitle(e.target.value)}
                            slotProps={{
                                inputLabel: {
                                    sx: { color: '#FFFFFF' },
                                },
                                input: {
                                    sx: {
                                        color: '#fff',
                                    },
                                },
                            }}
                        />
                        <Button variant="contained" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </div>}
            {person.name && 
            <div className="h-100 grid grid-rows-[auto_1fr_auto]">
                <div className="border-b-4 border-slate-950 p-3 flex justify-between items-center">
                    <ChatProfile title={person.title} name={person.name} ID={person.ID} profile_picture={person.profile_picture}/>
                    <Tooltip title="Click to view or edit your profile" className="cursor-pointer" arrow 
                        onClick={() => {
                            changePerson && changePerson({name: "", title: "", ID: "", profile_picture:"", edit: true, welcome: false})}
                        }>
                        {/* <ChatProfile title={title || ""} name={name || ""} ID={userId || ""} profile_picture={profile_picture || ""}/> */}
                        <Avatar src={avatarSrc} alt="Avatar" sx={{ bgcolor: green[400] }} />
                    </Tooltip>              
                </div>
                <div className="pr-4 pl-4 overflow-auto scrollbar-thumb-blue-400 scrollbar-track-slate-950 scrollbar-thin scroll-smooth">
                    {messages.length === 0 && <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-gray-400">
                            Start a converstion with {person.name.split(" ")[0]} below!
                        </p>
                    </div>}
                    <div className="flex flex-col">
                        {messages.map((message, index) => (
                            message.senderId === userId ?
                            (<Message key={index} reversed={true} message={message.message} profile_picture={profile_picture!}/>) :
                            (<Message key={index} message={message.message} profile_picture={person.profile_picture}/>)
                        ))}  
                    </div>
                    <div ref={bottomRef}/>
                </div>
                <div className="relative flex p-3 pt-0">
                    <input
                        type="text"
                        value={message.message}
                        onChange={handleMessageChange}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                handleSendMessage()
                            }
                        }}
                        className="rounded-md w-full p-2 placeholder-gray-400 text-white bg-slate-950 focus:outline-none text-sm focus:ring-2 focus:ring-blue-400"
                        placeholder="Type a message..."
                    />
                    <button
                        className={`absolute rounded bg-blue-400 text-white p-1 px-2 text-sm right-4 top-1 gap-x-2 flex items-center hover:cursor-pointer ${!message && "opacity-70"}`}
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