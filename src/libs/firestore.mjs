import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import "dotenv/config"

let firebaseInstance;

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};

const initialize = () => {
  if (firebaseInstance) return;
  firebaseInstance = initializeApp({
    credential: cert(serviceAccount),
  });
};

initialize()

const firestore = getFirestore();

export const getChannels = async () => {
  const channelsSnapshot = await firestore.collection("channels").get();
  const channels = [];
  channelsSnapshot.forEach((doc) => {
    const channelObj = {
      id: doc.id,
      name: doc.data().channelName,
      link: doc.data().channelLink,
      slug: doc.data().slug,
      thumbnail: doc.data().thumbnail
    };
    channels.push(channelObj);
  });
  return channels;
};

export const getLiveChatIds = async (channelId) => {
  const liveChatsSnapshot = await firestore.collection("channels").doc(channelId).listCollections()
  const liveChatIds = []
  liveChatsSnapshot.forEach(liveChat => {
    liveChatIds.push(liveChat.id)
  })
  return liveChatIds
}

export const getLiveChatData = async (channelId, liveId) => {
  const liveChatsSnapshot = await firestore.collection("channels").doc(channelId).collection(liveId).get();
  const liveChats = []
  liveChatsSnapshot.forEach(liveChat => {
    const liveChatObj = {
      id: liveChat.id,
      ...liveChat.data(),
      timestamp: liveChat.data().timestamp.toDate()
    }
    liveChats.push(liveChatObj)
  })
  return liveChats
}