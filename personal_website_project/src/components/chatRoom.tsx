"use client"

import ChatProfile from "./ChatProfile"
import ChatArea from "./ChatArea"
import { useState, useEffect } from "react";
import { useSession } from "@/context/context";

export default function ChatRoom() {
    const [ person, setPerson ] = useState({ name: "", title: "", ID: "" });
    const [ profiles, setProfiles ] = useState<{name: string, title: string, id: string, role:string}[]>([]);
    const [ adminUser, setAdminUser ] = useState<{name: string, title: string, id: string, role:string} | null>({name: "", title: "", id: "", role: ""});
   
    const { role } = useSession();

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const token = sessionStorage.getItem("myIdToken");
                const res = await fetch("https://getallprofiles-auu3gfb5pa-uc.a.run.app", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.statusText}`);
                }
                const data = await res.json();
                setProfiles(data);
                
                const admin = await data.find((user: { name: string; title: string; id: string; role: string }) => 
                    user.name === "Ephraim Akai-Nettey" && user.role === "admin"
                );
    
                if (admin) {
                    setAdminUser(admin);
                } else {
                    console.warn("Admin user not found");
                    setAdminUser(null);
                }

            } catch (error) {
                console.error(error);
            }
        };
        fetchProfiles();
    }, []);

    const handleChangePerson = async ({name, title, ID}: {name: string, title: string, ID: string}) => {
        setPerson({name, title, ID});    
    }

    return (
        <div className="bg-mint-500 bg-opacity-80 rounded-lg grid grid-cols-[auto_1fr] h-100vh">
            <div className="scrollbar-thumb-blue-400 scrollbar-track-slate-950 scrollbar-thin border-r-4 p-4 border-r-slate-950 flex flex-col gap-y-4 overflow-auto h-100 scroll-smooth">
                {(profiles.length > 1) && 
                    (role === "admin" ?  
                        (profiles.map((profile, index) => (
                            <ChatProfile key={index} changePerson={handleChangePerson} name={profile.name} title={profile.title} ID={profile.id} />
                    ))) : 
                        (
                            <ChatProfile changePerson={handleChangePerson} name={adminUser?.name || ""} title={adminUser?.title || ""} ID={adminUser?.id || ""} />
                    )
                )}
            </div>            
            <ChatArea person={person} adminUserID={adminUser?.id} />    
        </div>
    )
}