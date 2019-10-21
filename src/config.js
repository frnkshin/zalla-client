const dotenv = require('dotenv');
dotenv.config();

export const firebase = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJ_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

export const alphabet = "abcdefghijklmnopqrstuvwxyz23456789";

let server;
if (process.env.NODE_ENV === "development") {
  server = "http://localhost:3001"
} else {
  server = ""
}

export const SERVER_URL = server;
