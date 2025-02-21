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
import express, {CookieOptions} from "express";
import cookieParser from "cookie-parser";

admin.initializeApp();
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
const app = express();
app.use(cookieParser());
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
}));

app.post("/sessionCreation", async (req, res) => {
  try {
    const token = req.body.idToken;
    if (!token) {
      return res.status(400).json({error: "No token provided"});
    }
    const expiresIn = 5 * 24 * 60 * 60 * 1000;
    const sessionCookie = await admin.auth().createSessionCookie(
      token,
      {expiresIn}
    );
    const options = {
      httpOnly: true,
      secure: true,
      maxAge: expiresIn,
      sameSite: "none" as CookieOptions["sameSite"],
    };
    res.cookie("session", sessionCookie, options);
    return res.json({message: "Session cookie set!"});
  } catch (error) {
    console.error(error);
    return res.status(401).json(
      {error: "Unauthorized"}
    );
  }
});

app.get("/profile", async (req, res) => {
  try {
    const sessionCookie = req.cookies.session || "";
    const decodedClaims = await admin.auth().verifySessionCookie(
      sessionCookie, true
    );

    return res.json({
      message: "Profile data here",
      userId: decodedClaims.uid,
      sign_in_provider: decodedClaims.firebase?.sign_in_provider,
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({error: "Invalid or expired session cookie"});
  }
});

export const sessionApp = onRequest(app);
