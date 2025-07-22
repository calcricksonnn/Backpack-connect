import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

const { Expo } = require('expo-server-sdk');
const expo = new Expo();

export const onReportCreated = functions.firestore
  .document('reports/{rid}')
  .onCreate(async (snap) => {
    const report = snap.data();
    const tokensSnap = await admin.firestore().collection('modTokens').get();
    const messages = tokensSnap.docs.map(d => ({
      to: d.data().token,
      sound: 'default',
      title: 'New User Report',
      body: `${report.targetType} reported`
    }));
    await expo.sendPushNotificationsAsync(messages);
  });

export const onSOS = functions.firestore
  .document('sos/{uid}')
  .onCreate(async (snap) => {
    const { coords, contacts } = snap.data();
    const messages = [];
    for (const cid of contacts) {
      const tkDoc = await admin.firestore().collection('pushTokens').doc(cid).get();
      if (tkDoc.exists) {
        messages.push({
          to: tkDoc.data().token,
          sound: 'default',
          title: 'SOS Alert',
          body: `User ${snap.id} at (${coords.lat.toFixed(4)},${coords.lng.toFixed(4)})`
        });
      }
    }
    if (messages.length) await expo.sendPushNotificationsAsync(messages);
  });