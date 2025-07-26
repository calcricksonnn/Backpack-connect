// src/utils/tripService.ts
import { db } from '../firebase';
import {
  collection, doc, setDoc, getDoc,
  query, where, onSnapshot, addDoc, serverTimestamp,
  updateDoc
} from 'firebase/firestore';

export type TripEntry = {
  location: { lat: number; lng: number };
  title: string;
  note: string;
  photos: string[];
  timestamp: any;
};

export type Trip = {
  id: string;
  userId: string;
  title: string;
  startDate: any;
  route: { lat: number; lng: number; timestamp: any }[];
  entries: TripEntry[];
};

// Get currently active trip for user
export async function getActiveTrip(userId: string): Promise<Trip | null> {
  const q = query(
    collection(db, 'trips'),
    where('userId', '==', userId),
    where('active', '==', true)
  );
  const snap = await getDoc(doc(db, 'trips', `${userId}_active`));
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() } as Trip;
  }
  return null;
}

// Create a new trip
export async function createTrip(
  userId: string,
  title: string,
  startDate: Date
): Promise<Trip> {
  const id = `${userId}_active`;
  const ref = doc(db, 'trips', id);
  await setDoc(ref, {
    userId,
    title,
    startDate: serverTimestamp(),
    route: [],
    entries: [],
    active: true
  });
  const snap = await getDoc(ref);
  return { id: snap.id, ...snap.data() } as Trip;
}

// Listen to changes on a trip
export function listenToTrip(
  tripId: string,
  callback: (trip: Trip) => void
) {
  const ref = doc(db, 'trips', tripId);
  return onSnapshot(ref, snap => {
    callback({ id: snap.id, ...snap.data() } as Trip);
  });
}

// Add an entry (note+photo) and update route
export async function addEntry(tripId: string, entry: TripEntry) {
  const ref = doc(db, 'trips', tripId);
  const snap = await getDoc(ref);
  const data = snap.data()!;
  const newRoute = [
    ...data.route,
    { ...entry.location, timestamp: entry.timestamp }
  ];
  await updateDoc(ref, {
    route: newRoute,
    entries: [...data.entries, entry]
  });
}