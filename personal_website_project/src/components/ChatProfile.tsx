"use client"

import { Avatar, Typography } from "@mui/material"

export default function ChatProfile() {
    return (
        <div className="flex items-center gap-4">
            <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar"/>
            <div>
                <Typography variant="body1">Ephraim Akai-Nettey</Typography>
                <Typography variant="body2" color="gray" className="font-normal">
                    Software Engineer
                </Typography>
            </div>
      </div>
    )
}