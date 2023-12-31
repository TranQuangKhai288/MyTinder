import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { FIREBASE_REALTIME_DB } from "../../firebaseConfig";
import { ref, set } from "firebase/database";

// Register user with email and password
export const registerUser = async (user, password, showNoti, showNoti2) => {
  await createUserWithEmailAndPassword(FIREBASE_AUTH, user.email, password)
    .then(async (userCredential) => {
      // Signed in
      user.id = userCredential.user.uid;
      user.succesfulRegister = true;
      try {
        await sendEmailVerification(userCredential.user);
        // showNoti("Email verification sent", "Please check your email.");
        showNoti2("Email verification sent, please check your email.");
      } catch (error) {
        if (error.code === "auth/too-many-requests") {
          // showNoti(
          //   "Verification email already sent",
          //   "Please check your email."
          // );
          showNoti2(
            "Verification email already sent",
            "Please check your email."
          );
        } else {
          showNoti("Cannot send email verification", "Please try again.");
          console.log("Error sending email verification: ", error.code);
        }
      }
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        showNoti("Email already in use", "Please try again.");
      } else {
        showNoti("Something went wrong", "Please try again.");
        console.log("Error code: ", error.code);
      }
    });
};

// Login user with email and password
export const loginUser = async (user, password, showNoti) => {
  await signInWithEmailAndPassword(FIREBASE_AUTH, user.email, password)
    .then(async (userCredential) => {
      user.id = userCredential.user.uid;
      if (userCredential.user.emailVerified) {
        user.isVerified = true;
      } else {
        showNoti("Your email is not verified", "Please verify your email.");
        try {
          await sendEmailVerification(userCredential.user);
        } catch (error) {
          console.log("Error sending email verification: ", error);
        }
      }
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found") {
        showNoti("User not found", "Please register an account.");
      } else if (error.code === "auth/wrong-password") {
        showNoti("Wrong password", "Please try again.");
      } else if (error.code === "auth/invalid-email") {
        showNoti("Invalid email", "Please try again.");
      } else {
        showNoti("Something went wrong", "Please try again.");
        console.log("Error code: ", error.code);
      }
    });
};

// Logout user
export const logoutUser = () => {
  signOut(FIREBASE_AUTH)
    .then(() => {
      // Sign-out successful.
      console.log("Sign-out successful.");
    })
    .catch((error) => {
      console.log(`Error code: ${error.code} - ${error.message}`);
    });
};

// Add user to firestore
export const addUserToFirestore = async (user) => {
  try {
    const newDocRef = await addDoc(collection(FIRESTORE_DB, "User"), {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      birthday: user.birthday,
      gender: user.gender,
      occupation: user.occupation,
      aboutMe: user.aboutMe,
      gallery: user.gallery,
      email: user.email,
      avatar: user.avatar,
      interests: user.interests,
      isVerified: user.isVerified,
      isSetUp: user.isSetUp,
      matches: [],
      beMatched: [],
      chats: [],
    });
    const documentID = newDocRef.id;
    await updateDoc(newDocRef, { docID: documentID });
    user.docID = documentID;
  } catch (error) {
    console.log("Error adding user document: ", error);
  }
};

//Get user data firestore
export const fetchUserData = async (user) => {
  try {
    const docRef = doc(FIRESTORE_DB, "User", user.docID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // Document exists
      const documentData = docSnap.data();
      user.firstName = documentData.firstName;
      user.lastName = documentData.lastName;
      user.birthday = documentData.birthday;
      user.gender = documentData.gender;
      user.occupation = documentData.occupation;
      user.aboutMe = documentData.aboutMe;
      user.email = documentData.email;
      user.avatar = documentData.avatar;
      user.interests = documentData.interests;
      user.isVerified = documentData.isVerified;
      user.isSetUp = documentData.isSetUp;
      user.matches = documentData.matches;
      user.beMatched = documentData.beMatched;
      user.chats = documentData.chats;
    } else {
      // Document does not exist
      console.log("User does not exist");
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const findUserDocumentIdFromFirestore = async (email) => {
  const q = query(
    collection(FIRESTORE_DB, "User"),
    where("email", "==", email)
  );
  try {
    const querySnapshot = await getDocs(q);
    let documentId;
    querySnapshot.forEach((doc) => {
      documentId = doc.id;
    });
    return documentId;
  } catch (error) {
    console.log("Error finding document id: ", error);
  }
};

// Update user to firestore
export const updateUserDocumentToFirestore = async (user) => {
  try {
    await updateDoc(doc(FIRESTORE_DB, "User", user.docID), {
      firstName: user.firstName,
      lastName: user.lastName,
      birthday: user.birthday,
      occupation: user.occupation,
      aboutMe: user.aboutMe,
      gender: user.gender,
      email: user.email,
      avatar: user.avatar,
      interests: user.interests,
      isVerified: user.isVerified,
      isSetUp: user.isSetUp,
      matches: user.matches,
      beMatched: user.beMatched,
      chats: user.chats,
    });
  } catch (error) {
    console.log("Error updating user document: ", error);
  }
};

export const updateUserVerifyToFirestore = async (user) => {
  try {
    await updateDoc(doc(FIRESTORE_DB, "User", user.docID), {
      isVerified: user.isVerified,
    });
  } catch (error) {
    console.log("Error updating user document: ", error);
  }
};

export const updateUserSetUpToFirestore = async (user) => {
  try {
    await updateDoc(doc(FIRESTORE_DB, "User", user.docID), {
      isSetUp: user.isSetUp,
    });
  } catch (error) {
    console.log("Error updating user document: ", error);
  }
};

export const updateUserInterestsToFirestore = async (user) => {
  try {
    await updateDoc(doc(FIRESTORE_DB, "User", user.docID), {
      interests: user.interests,
    });
  } catch (error) {
    console.log("Error updating user document: ", error);
  }
};

export const updateUserChatsToFirestore = async (user) => {
  try {
    await updateDoc(doc(FIRESTORE_DB, "User", user.docID), {
      chats: user.chats,
    });
  } catch (error) {
    console.log("Error updating user document: ", error);
  }
};

export const updateUserMatchesToFirestore = async (user) => {
  try {
    await updateDoc(doc(FIRESTORE_DB, "User", user.docID), {
      matches: user.matches,
    });
  } catch (error) {
    console.log("Error updating user document: ", error);
  }
};

export const fetchAllUserData = async () => {
  try {
    const querySnapshot = await getDocs(collection(FIRESTORE_DB, "User"));
    let users = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    return users;
  } catch {
    console.log("Error fetching all user data: ", error);
  }
};

export const updateOnlineStatus = (user) => {
  const statusRef = ref(FIREBASE_REALTIME_DB, "status/" + user.id);
  set(statusRef, {
    status: "online",
    key: statusRef.key,
  });
};

export const updateOfflineStatus = (user) => {
  const statusRef = ref(FIREBASE_REALTIME_DB, "status/" + user.id);
  set(statusRef, {
    status: "offline",
    key: statusRef.key,
  });
};
