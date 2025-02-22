// src/context/SessionContext.tsx
"use client"

import React, {
    createContext,
    useEffect,
    useState,
    useContext,
    ReactNode,
} from "react";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
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
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribeAuthState = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Get the ID token for this anonymous user
                const token = await user.getIdToken(/* forceRefresh= */ true);
                sessionStorage.setItem("myIdToken", token);

                setUserId(user.uid || null);
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
