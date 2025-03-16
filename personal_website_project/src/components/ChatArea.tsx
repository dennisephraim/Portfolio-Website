"use client"

import { Input, Button, Avatar, Typography } from "@material-tailwind/react";
import { useState } from "react";
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
                <Typography variant="small" color="gray" className="font-normal">
                    Start a converstion below!
                </Typography>
            </div>
            <div className="relative flex pr-4 pl-4 pt-4">
                <Input
                    type="text"
                    label="Message"
                    color="blue"
                    value={message}
                    onChange={handleMessageChange}
                    className="pr-20 text-white"
                    containerProps={{
                        className: "min-w-0",
                    }}
                />
                <Button
                    size="sm"
                    color={message ? "blue" : "gray"}
                    disabled={!message}
                    className="!absolute right-5 top-5 rounded"
                >
                    Send
                </Button>
            </div>
        </div>
    )
}