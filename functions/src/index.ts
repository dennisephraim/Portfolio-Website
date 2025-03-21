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
          name: "Anonymous",
          title: "Anonymous",
          id: userId,
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

export const getAllProfiles = onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const authHeader = req.headers.authorization || "";
      if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({error: "No token provided"});
      }
      const idToken = authHeader.split("Bearer ")[1];
      await admin.auth().verifyIdToken(idToken);

      const usersRef = db.collection("users");
      const snapshot = await usersRef.get();

      return res.status(200).json(snapshot.docs.map((doc) => doc.data()));
    } catch (error) {
      console.error(error);
      return res.status(403).json({error: "Invalid or expired token"});
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

export const addMessage = onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    if (req.method == "POST") {
      try {
        const authHeader = req.headers.authorization || "";
        if (!authHeader.startsWith("Bearer ")) {
          return res.status(401).json({error: "No token provided"});
        }
        const idToken = authHeader.split("Bearer ")[1];
        await admin.auth().verifyIdToken(idToken);

        const message = req.body.message;
        const senderId = req.body.senderId;
        const receiverId = req.body.receiverId;
        const timestamp = req.body.timestamp;
        const isAdminUserSender = req.body.isAdminUserSender;

        const id = isAdminUserSender ?
          `${receiverId}-${senderId}` : `${senderId}-${receiverId}`;

        const messageRef = db.collection("messages").doc(id);

        await messageRef.set({
          [timestamp]: {
            message: message,
            senderId: senderId,
            receiverId: receiverId,
            timestamp: timestamp,
          },
        }, {merge: true});

        return res.status(200).json({res: "Message sent"});
      } catch (error) {
        console.error(error);
        return res.status(403).json({error: "Invalid or expired token"});
      }
    } else {
      return res.status(405).send("Method not allowed!");
    }
  });
});

export const getUsersMessages = onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    if (req.method == "POST") {
      try {
        const authHeader = req.headers.authorization || "";
        if (!authHeader.startsWith("Bearer ")) {
          return res.status(401).json({error: "No token provided"});
        }
        const idToken = authHeader.split("Bearer ")[1];
        await admin.auth().verifyIdToken(idToken);

        const senderId = req.body.senderId;
        const receiverId = req.body.receiverId;
        const isAdminUserSender = req.body.isAdminUserSender;

        const id = isAdminUserSender ?
          `${receiverId}-${senderId}` : `${senderId}-${receiverId}`;

        const messagesRef = db.collection("messages").doc(id);
        const snapshot = await messagesRef.get();

        if (!snapshot.exists) {
          return res.status(200).json([]);
        } else {
          const data = snapshot.data()!;
          const messages = Object.values(data);
          messages.sort((a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
          return res.status(200).json(messages);
        }
      } catch (error) {
        console.error(error);
        return res.status(403).json({error: "Invalid or expired token"});
      }
    } else {
      return res.status(405).send("Method not allowed!");
    }
  });
});
