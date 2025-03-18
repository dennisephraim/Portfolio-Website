"use client"

import { useState } from "react";
import { Avatar, Typography, } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Message from "./Message";

export default function ChatArea() {
    const [ message, setMessage ] = useState("");

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    return (
        <div className="h-96 grid grid-rows-[auto_1fr_auto]">
            <div className="border-b-4 border-custom_slate pb-4 pr-4 pl-4 flex justify-end">
                <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar"/>
            </div>
            <div className="pr-4 pl-4 items-center text-gray-700 flex justify-center">
                <Typography variant="body2" color="gray" className="font-normal">
                    Start a converstion below!
                </Typography>
                <Message message="Hello!" reversed={true}/>
            </div>
            <div className="relative flex pr-4 pl-4 pt-4">
                <input
                    type="text"
                    value={message}
                    onChange={handleMessageChange}
                    className="rounded-md w-full p-1.5 text-white bg-custom_slate focus:outline-none focus:outline-blue-400"
                />
                <button
                    className="absolute rounded bg-blue-400 text-white p-1 px-2 text-sm right-5 top-5 gap-x-2 flex items-center" 
                >
                    Send
                    <SendIcon fontSize="small" />
                </button>
            </div>
        </div>
    )
}