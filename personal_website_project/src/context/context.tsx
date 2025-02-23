// src/context/SessionContext.tsx
"use client"

import React, {
    createContext,
    useEffect,
    useState,
    useContext,
    ReactNode,
} from "react";
import { onAuthStateChanged, signInAnonymously, onIdTokenChanged, User } from "firebase/auth";
import { auth } from "../firebase/config"

/**
 * 2) Define the shape of the session context
 */
type SessionContextValue = {
    user: User | null;  // The anonymous user's UID (or null if not set)
    loading: boolean;       // Whether we are still loading/checking
    error: string | null;   // Any error message encountered
};

const SessionContext = createContext<SessionContextValue>({
    user: null,
    loading: true,
    error: null,
});

interface SessionProviderProps {
    children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribeAuthState = onIdTokenChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken( true);
                sessionStorage.setItem("myIdToken", token);

                setUser(user);
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

    const contextValue: SessionContextValue = {
        user,
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
