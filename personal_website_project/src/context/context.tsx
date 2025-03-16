"use client"

import React, {
    createContext,
    useEffect,
    useState,
    useContext,
    ReactNode,
} from "react";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config"

type SessionContextValue = {
    userId: string | null;
    role: string | null;
    loading: boolean;
    error: string | null;
};

const SessionContext = createContext<SessionContextValue>({
    userId: null,
    role: null,
    loading: true,
    error: null,
});

interface SessionProviderProps {
    children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
    const [userId, setUser] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // console.log("onfirstLogin")
        const unsubscribeAuthState = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken(true);
                sessionStorage.setItem("myIdToken", token);
                setUser(user.uid);
                setLoading(false);

                // fetch user's data
                try {
                    const res = await fetch("https://getprofile-auu3gfb5pa-uc.a.run.app/getProfile", {
                        method: "GET",
                        headers: { Authorization: `Bearer ${token}` },
                    });
                  
                    if (!res.ok) {
                        throw new Error(`Failed to fetch: ${res.statusText}`);
                    }
                  
                    const data = await res.json();
                    setRole(data.role)  
                } catch (error) {
                    console.error(error)
                }    

            } else {
                try {
                    const newUser = await signInAnonymously(auth);
                    const newToken = await newUser.user.getIdToken()
                    // add new user to database
                    console.log(newUser.user.uid)
                    try {
                        const res = await fetch("https://addprofile-auu3gfb5pa-uc.a.run.app", {
                            method: "POST",
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                      
                        if (!res.ok) {
                            throw new Error(`Failed to add new user: ${res.statusText}`);
                        }
                        const data = await res.json();
                        setRole(data.role)  
                    } catch (error) {
                        console.error(error)
                    }    
                } catch (err: unknown) {
                    if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError(String(err));
                    }
                }
            }
        });

        return () => unsubscribeAuthState()
    }, []);

    useEffect(() => {
        const minutes=4;
        const interval=minutes * 60 * 10000;
        // console.log("authcontext")
        
        const handle = setInterval(async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const newToken = await user.getIdToken(true);
                    sessionStorage.setItem("myIdToken", newToken)
                    // console.log(user);
                } catch (error) {
                    console.error(error)
                }
            }
        }, interval);
        return () => clearInterval(handle);
    }, [])

    const contextValue: SessionContextValue = {
        userId,
        role,
        loading,
        error,
    };

    return (
        <SessionContext.Provider value={contextValue}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    return useContext(SessionContext);
}
