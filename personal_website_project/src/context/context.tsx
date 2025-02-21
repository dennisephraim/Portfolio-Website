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
import {auth} from "../firebase/config"

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
        let unsubscribeAuthState: (() => void) | null = null;

        // Helper function to sign in anonymously if needed
        async function attemptAnonymousSignIn() {
            unsubscribeAuthState = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    // We have a user object from Firebase
                    unsubscribeAuthState?.();

                    // Get the ID token for this anonymous user
                    const token = await user.getIdToken(/* forceRefresh= */ true);

                    // Exchange the ID token for a session cookie
                    const resp = await fetch("https://sessionapp-auu3gfb5pa-uc.a.run.app/sessionCreation", {
                        method: "POST",
                        credentials: "include", // so we send/receive cookies
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ idToken: token }),
                    });
                    if (!resp.ok) {
                        const data = await resp.json().catch(() => ({}));
                        setError(data.error || "Failed to create session cookie");
                        setLoading(false);
                        return;
                    }

                    // Now that the cookie is set, let's confirm by calling /profile again
                    const profileResp = await fetch("https://sessionapp-auu3gfb5pa-uc.a.run.app/profile", {
                        credentials: "include",
                    });
                    if (!profileResp.ok) {
                        setError("Failed to verify session cookie");
                        setLoading(false);
                        return;
                    }
                    const profileData = await profileResp.json();
                    setUserId(profileData.userId || null);
                    setLoading(false);
                } else {
                    // If we have no Firebase user, sign in anonymously
                    // This might happen on the first ever visit
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
        }

        async function checkExistingSessionCookie() {
            try {
                // 1) Check if there's already a valid session cookie
                const resp = await fetch("https://sessionapp-auu3gfb5pa-uc.a.run.app/profile", { credentials: "include" });

                if (resp.ok) {
                    // Already have a valid session
                    const data = await resp.json();
                    setUserId(data.userId || null);
                    setLoading(false);
                    } else if (resp.status === 401) {
                    // No valid session => sign in anonymously
                    await attemptAnonymousSignIn();
                    } else {
                    // Some other error
                    const data = await resp.json().catch(() => ({}));
                    setError(data.error || "Unknown error checking session");
                    setLoading(false);
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(String(err));
                }
            }
        }

        checkExistingSessionCookie();
        return () => {
            if (unsubscribeAuthState) unsubscribeAuthState();
        };
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
