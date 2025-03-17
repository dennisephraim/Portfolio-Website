"use client"

import { useState } from "react";
import { Avatar, Typography, Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

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
            </div>
            <div className="relative flex pr-4 pl-4 pt-4">
                <TextField
                    type="text"
                    label="Message"
                    size="small"
                    value={message}
                    onChange={handleMessageChange}
                    className="pr-20 rounded-md"
                    fullWidth
                />
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    className="!absolute right-5 top-5 rounded"
                    endIcon={<SendIcon />}
                >
                    Send
                </Button>
            </div>
        </div>
    )
}