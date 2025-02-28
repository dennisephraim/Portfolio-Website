"use client"

import Goal from "@/components/goal"
import Status from "@/components/status"
import AddGoal from "@/components/addGoal"
import { useSession } from "@/context/context"

const temp_task = [
    {name: 'pushups'},
    {name: 'situps'},
    {name: 'leetcode'},
]

export default function SoloLeveling() {
    const {userId, role, loading, error} = useSession()
    if (loading) return <p>Loading Session</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className="grid grid-cols-2">
            <Status />
            <Goal questTitle={"Lock-In"} tasks={temp_task}/>
            <AddGoal/>
            <p>Your anonymous UID: {role}</p>
            <p>Test</p>
        </div>
    )
}