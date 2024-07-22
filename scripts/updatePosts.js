// UpdatePosts.js

import { db } from "@/app/firebase/config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const updatePosts = async () => {
  try {
    const postsRef = collection(db, "posts");
    const querySnapshot = await getDocs(postsRef);

    querySnapshot.forEach(async (postDoc) => {
      const postData = postDoc.data();
      const userRef = doc(db, "users", postData.createdBy);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const createdByUsername = userData.inputValue;

        await updateDoc(postDoc.ref, {
          createdByUsername: createdByUsername || "Anonymous",
        });
      }
    });

    console.log("Posts updated successfully!");
  } catch (error) {
    console.error("Error updating posts: ", error);
  }
};

updatePosts();
