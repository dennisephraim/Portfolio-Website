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

admin.initializeApp();
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest(async (request, response) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      response.status(401).json({error: "Unauthorized: No token provided"});
      return;
    }
    const idToken = authHeader?.split("Bearer ")[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const userId = decodedToken.uid;

    response.status(200).send(
      {message: "Hello from Firebase!", userId: userId}
    );
  } catch (error) {
    response.status(403).send({error: "Forbidden: Invalid or expired token"});
    return;
  }
});
