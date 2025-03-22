"use Client"

import { Avatar, Typography } from "@mui/material"
import { green } from "@mui/material/colors"

export default function Message({message, reversed, profile_picture}: {message: string, reversed?: boolean, profile_picture: string}) {
    return (
        <div className={`flex items-center gap-x-2 p-2 pl-0 ${reversed ? "justify-end": ""}`}>
            {!reversed && <Avatar src={profile_picture} alt="Avatar" sx={{ width: 30, height: 30, bgcolor: green[400] }} />}
            <div>
                <Typography variant="body2" color="white" className={`font-normal px-2 py-1 rounded-xl ${reversed ? "bg-gray-700" : "bg-blue-400"}`}>
                    {message}
                </Typography>
            </div>
            {reversed && <Avatar src={profile_picture} alt="Avatar" sx={{ width: 30, height: 30, bgcolor: green[400] }}/>}
        </div>
    )
}