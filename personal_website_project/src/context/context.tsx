// src/context/SessionContext.tsx
"use client"

import React, {
    createContext,
    useEffect,
    useState,
    useContext,
    ReactNode,
} from "react";
import { signInAnonymously, onIdTokenChanged } from "firebase/auth";
import { auth } from "../firebase/config"

/**
 * 2) Define the shape of the session context
 */
type SessionContextValue = {
    userId: string | null;  // The anonymous user's UID (or null if not set)
    loading: boolean;       // Whether we are still loading/checking
    error: string | null;   // Any error message encountered
};

const SessionContext = createContext<SessionContextValue>({
    userId: null,
    loading: true,
    error: null,
});

interface SessionProviderProps {
    children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
    const [userId, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("onfirstLogin")
        const unsubscribeAuthState = onIdTokenChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken(true);
                sessionStorage.setItem("myIdToken", token);
                setUser(user.uid);
                setLoading(false);
            } else {
                try {
                    await signInAnonymously(auth);
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
        console.log("authcontext")
        
        const handle = setInterval(async () => {
            const user = auth.currentUser;
            if (user) {
              //  console.log("Auth Context, setInterval invoked, getIdToken o user performed");
                //true - force refresh
                const newToken = await user.getIdToken(true);
                sessionStorage.setItem("myIdToken", newToken)
                console.log(user);
            }
        }, interval);
        return () => clearInterval(handle);
    }, [])

    const contextValue: SessionContextValue = {
        userId,
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
