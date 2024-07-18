import { createContext, useContext, useState, useEffect } from "react";
import { db } from "@/app/firebase/config";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const currentUser = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const sendMessage = async (receiverId, message) => {
    if (!currentUser) return;
    try {
      await addDoc(collection(db, "chats"), {
        senderId: currentUser.uid,
        receiverId,
        message,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const fetchUsers = async () => {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const usersList = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(usersList);
  };

  useEffect(() => {
    fetchUsers();
    if (currentUser) {
      const q = query(
        collection(db, "chats"),
        where("senderId", "==", currentUser.uid),
        orderBy("timestamp", "asc")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let messagesArray = [];
        querySnapshot.forEach((doc) => {
          messagesArray.push({ id: doc.id, ...doc.data() });
        });
        setMessages(messagesArray);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <ChatContext.Provider value={{ messages, sendMessage, loading, users }}>
      {children}
    </ChatContext.Provider>
  );
};
