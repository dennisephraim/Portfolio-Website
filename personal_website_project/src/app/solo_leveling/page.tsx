"use client"

import Goal from "@/components/goal"
import Status from "@/components/status"
import AddGoal from "@/components/addGoal"
import { UseSession } from "@/context/context"

const temp_task = [
    {name: 'pushups'},
    {name: 'situps'},
    {name: 'leetcode'},
]

export default function soloLeveling() {
    const {userId, loading, error} = UseSession()
    if (loading) return <p>Loading Session</p>
    if (error) return {notFound: true,}
  
    
    return (
        <div className="grid grid-cols-2">
            <Status />
            <Goal questTitle={"Lock-In"} tasks={temp_task}/>
            <AddGoal/>
            <p>Your anonymous UID: {userId}</p>
        </div>
    )
}