"use Client"

import { Avatar, Typography } from "@mui/material"

export default function Message({message, reversed}: {message: string, reversed?: boolean}) {
    return (
        <div className="flex items-center gap-x-2">
            {!reversed && <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar"/>}
            <div>
                <Typography variant="body2" color="white" className="font-normal p-1 bg-blue-400 rounded-xl">
                    {message}
                </Typography>
            </div>
            {reversed && <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar"/>}
        </div>
    )
}