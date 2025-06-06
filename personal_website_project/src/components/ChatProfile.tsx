"use client"

import { Avatar, Typography } from "@mui/material"
import { green } from "@mui/material/colors"

export default function ChatProfile({name, title, ID, profile_picture, selected, reversed, changePerson}: {name: string, title: string, ID: string, profile_picture: string, selected?: boolean, reversed?: boolean, changePerson?: ({name, title, ID, profile_picture}: {name: string, title: string, ID: string, profile_picture: string}) => void}) {
    const avatarSrc = profile_picture && profile_picture !== "none" ? profile_picture : undefined;
    return (
        <div 
            className={`transition-colors flex items-center gap-4 cursor-pointer px-2 py-1 hover:bg-gray-700 rounded-md ${selected ? "bg-gray-600" : ""}`}
            onClick={() => 
                changePerson && changePerson({name, title, ID, profile_picture})
            }
        >
            {!reversed && <Avatar src={avatarSrc} alt="Avatar" sx={{ bgcolor: green[400] }} />}
            <div>
                <Typography variant="body1">{name}</Typography>
                <p className="text-sm text-gray-400">
                    {title}
                </p>
            </div>
            {reversed && <Avatar src={avatarSrc} alt="Avatar" sx={{ bgcolor: green[400] }} />}
      </div>
    )
}