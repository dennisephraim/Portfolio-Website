/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import admin from "firebase-admin";
import cors from "cors";

admin.initializeApp();
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
const corsHandler = cors({origin: true});

export const getProfile = onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      // 1. Read the Authorization header
      const authHeader = req.headers.authorization || "";
      if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({error: "No token provided"});
      }

      // 2. Extract the ID token
      const idToken = authHeader.split("Bearer ")[1];

      // 3. Verify the token with Firebase Admin
      const decoded = await admin.auth().verifyIdToken(idToken);
      const userId = decoded.uid;
      const signInProvider = decoded.firebase?.sign_in_provider;

      // Return user info or protected data
      return res.json({
        message: "Profile data here",
        userId,
        signInProvider,
      });
    } catch (error) {
      console.error(error);
      return res.status(403).json({error: "Invalid or expired token"});
    }
  });
});

