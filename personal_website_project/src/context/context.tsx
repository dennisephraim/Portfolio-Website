// src/context/SessionContext.tsx
"use client"

import React, {
    createContext,
    useEffect,
    useState,
    useContext,
    ReactNode,
} from "react";
import { signInAnonymously, onIdTokenChanged, setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "../firebase/config"

type SessionContextValue = {
    userId: string | null;
    loading: boolean;
    error: string | null;
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
        setPersistence(auth, browserSessionPersistence)
        .then(() => {
            const unsubscribeAuthState = onIdTokenChanged(auth, async (user) => {
                if (user) {
                    try {
                        const token = await user.getIdToken(false);
                        sessionStorage.setItem("myIdToken", token);
                        setUser(user.uid);
                        setLoading(false);
                    } catch (err) {
                        console.error("Error getting ID token:", err);
                        setError((err as Error).message || String(err));
                    }
                } else {
                    try {
                        await signInAnonymously(auth);
                    } catch (err: unknown) {
                        console.error("Error signing in anonymously:", err);
                        if (err instanceof Error) {
                            setError(err.message);
                        } else {
                            setError(String(err));
                        }
                    }
                }
            });

            return () => unsubscribeAuthState();
        })
        .catch((persistenceError) => {
            console.error("Error setting persistence:", persistenceError);
            setError((persistenceError as Error).message || String(persistenceError));
        });
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
