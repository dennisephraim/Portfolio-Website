import {onRequest} from "firebase-functions/v2/https";
import admin from "./firebaseAdmin";
import cors from "cors";

const corsHandler = cors({origin: true});
const db = admin.firestore();

export const addProfile = onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    if (req.method == "POST") {
      try {
        const authHeader = req.headers.authorization || "";
        if (!authHeader.startsWith("Bearer ")) {
          return res.status(401).json({error: "No token provided"});
        }

        const idToken = authHeader.split("Bearer ")[1];

        const decoded = await admin.auth().verifyIdToken(idToken);
        const userId = decoded.uid;

        await db.collection("users").doc(userId).set({
          role: "user",
        });

        return res.status(200).json({role: "user"});
      } catch (error) {
        console.error(error);
        return res.status(403).json({error: "Invalid or expired token"});
      }
    } else {
      return res.status(405).send("Method not allowed!");
    }
  });
});

export const getProfile = onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const authHeader = req.headers.authorization || "";
      if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({error: "No token provided"});
      }

      const idToken = authHeader.split("Bearer ")[1];

      const decoded = await admin.auth().verifyIdToken(idToken);
      const userId = decoded.uid;

      const userRef = db.collection("users").doc(userId);
      const snapshot = (await userRef.get()).data();

      return res.status(200).json(snapshot);
    } catch (error) {
      console.error(error);
      return res.status(403).json({error: "Invalid or expired token"});
    }
  });
});

export const getBlogs = onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const authHeader = req.headers.authorization || "";
      if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({error: "No token provided"});
      }
      const idToken = authHeader.split("Bearer ")[1];
      await admin.auth().verifyIdToken(idToken);

      const blogsRef = db.collection("blogs");
      const snapshot = await blogsRef.orderBy("timestamp", "desc").get();

      const blogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return res.status(200).json(blogs);
    } catch (error) {
      console.error(error);
      return res.status(403).json({error: "Invalid or expired token"});
    }
  });
});

export const addBlog = onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    if (req.method == "POST") {
      try {
        const authHeader = req.headers.authorization || "";
        if (!authHeader.startsWith("Bearer ")) {
          return res.status(401).json({error: "No token provided"});
        }
        const idToken = authHeader.split("Bearer ")[1];
        await admin.auth().verifyIdToken(idToken);

        const header = req.body.header;
        const content = req.body.content;
        const timestamp = req.body.timestamp;

        const result = await db.collection("blogs").doc(timestamp).set({
          header: header,
          content: content,
          timestamp: timestamp,
        });

        return res.status(200).json({result: result});
      } catch (error) {
        console.log(error);
        return res.status(403).json({error: error});
      }
    } else {
      return res.status(405).send("Method not allowed!");
    }
  });
});
