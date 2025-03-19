"use Client"

import { Avatar, Typography } from "@mui/material"

export default function Message({message, reversed}: {message: string, reversed?: boolean}) {
    return (
        <div className="flex items-center gap-x-2 p-2 pl-0">
            {!reversed && <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" sx={{ width: 30, height: 30 }} />}
            <div>
                <Typography variant="body2" color="white" className="font-normal p-1 bg-blue-400 rounded-xl">
                    {message}
                </Typography>
            </div>
            {reversed && <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" sx={{ width: 30, height: 30 }} />}
        </div>
    )
}