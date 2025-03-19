import { Avatar, Typography } from "@mui/material"

export default function ChatProfile({name, title, ID, changePerson}: {name: string, title: string, ID: string, changePerson: ({name, title, ID}: {name: string, title: string, ID: string}) => void}) {
    return (
        <div 
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => changePerson({name, title, ID})}
        >
            <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar"/>
            <div>
                <Typography variant="body1">{name}</Typography>
                <p className="text-sm text-gray-400">
                    {title}
                </p>
            </div>
      </div>
    )
}