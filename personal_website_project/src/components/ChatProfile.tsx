import { Avatar, Typography } from "@mui/material"

export default function ChatProfile({name, title, ID, profile_picture, changePerson}: {name: string, title: string, ID: string, profile_picture: string, changePerson: ({name, title, ID, profile_picture}: {name: string, title: string, ID: string, profile_picture: string}) => void}) {
    return (
        <div 
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => changePerson({name, title, ID, profile_picture})}
        >
            <Avatar src={profile_picture} alt="avatar"/>
            <div>
                <Typography variant="body1">{name}</Typography>
                <p className="text-sm text-gray-400">
                    {title}
                </p>
            </div>
      </div>
    )
}