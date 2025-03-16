"use client"

import {Avatar} from "@material-tailwind/react/components/Avatar";
import {Typography} from "@material-tailwind/react/components/Typography";


export default function ChatProfile() {
    return (
        <div className="flex items-center gap-4">
            <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar"/>
            <div>
                <Typography variant="h6">Ephraim Akai-Nettey</Typography>
                <Typography variant="small" color="gray" className="font-normal">
                    Software Engineer
                </Typography>
            </div>
      </div>
    )
}