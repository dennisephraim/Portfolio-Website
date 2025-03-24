import { Avatar, Typography } from "@mui/material"
import { green } from "@mui/material/colors"

export default function ChatProfile({name, title, ID, profile_picture, reversed, changePerson}: {name: string, title: string, ID: string, profile_picture: string, reversed?: boolean, changePerson?: ({name, title, ID, profile_picture}: {name: string, title: string, ID: string, profile_picture: string}) => void}) {
    return (
        <div 
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => changePerson && changePerson({name, title, ID, profile_picture})}
        >
            {!reversed && <Avatar src={profile_picture} sx={{ bgcolor: green[400] }}/>}
            <div>
                <Typography variant="body1">{name}</Typography>
                <p className="text-sm text-gray-400">
                    {title}
                </p>
            </div>
            {reversed && <Avatar src={profile_picture} alt="Avatar" sx={{ bgcolor: green[400] }}/>}
      </div>
    )
}