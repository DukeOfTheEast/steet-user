import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";

export const markMessagesAsRead = async (currentUserId, otherUserId) => {
  const conversationsRef = collection(db, "conversations");
  const conversationsQuery = query(
    conversationsRef,
    where("participants", "array-contains", currentUserId)
  );

  const querySnapshot = await getDocs(conversationsQuery);

  for (const doc of querySnapshot.docs) {
    const participants = doc.data().participants;
    if (participants.includes(otherUserId)) {
      const messagesRef = collection(db, `conversations/${doc.id}/messages`);
      const unreadMessagesQuery = query(
        messagesRef,
        where("read", "==", false),
        where("sender", "==", otherUserId)
      );

      const unreadMessages = await getDocs(unreadMessagesQuery);

      const batch = writeBatch(db);
      unreadMessages.forEach((messageDoc) => {
        batch.update(messageDoc.ref, { read: true });
      });

      await batch.commit();
      break;
    }
  }
};
