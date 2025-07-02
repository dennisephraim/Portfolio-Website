"use client"

import Goal from "@/components/goal"
import Status from "@/components/status"
import AddGoal from "@/components/addGoal"
import { useSession } from "@/context/context"
import PageTransition from "@/components/PageTransition"

const temp_task = [
    {name: 'pushups'},
    {name: 'situps'},
    {name: 'leetcode'},
]

export default function SoloLeveling() {
    const {userId, loading, error} = useSession()
    if (loading) return <p>Loading Session</p>
    if (error) return <p>Error: {error}</p>

    return (
        <PageTransition>
            <div className="grid grid-cols-2">
                Content coming soon!
                <p>Your anonymous UID: {userId}</p>
            </div>
        </PageTransition>
    )
}