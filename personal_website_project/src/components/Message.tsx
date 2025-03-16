"use Client"

import { Typography, Avatar } from "@material-tailwind/react"

export default function Message({message, reversed}: {message: string, reversed?: boolean}) {
    return (
        <div className="flex items-center gap-x-2">
            {!reversed && <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" size="sm"/>}
            <div>
                <Typography variant="small" color="white" className="font-normal p-1 bg-blue-400 rounded-xl">
                    {message}
                </Typography>
            </div>
            {reversed && <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" size="sm"/>}
        </div>
    )
}