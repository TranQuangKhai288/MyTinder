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
  getDocs,
} from "firebase/firestore";
import { Alert } from "react-native";

// Register user with email and password
export const registerUser = async (user, password) => {
  await createUserWithEmailAndPassword(FIREBASE_AUTH, user.email, password)
    .then(async (userCredential) => {
      // Signed in
      user.id = userCredential.user.uid;
      user.succesfulRegister = true;
      try {
        await sendEmailVerification(userCredential.user);
        Alert.alert("Verification email sent", "Please check your email.");
      } catch (error) {
        if (error.code === "auth/too-many-requests") {
          Alert.alert("Verification already sent", "Please check your email.");
        } else {
          Alert.alert("Can not send verification email", "Please try again.");
          console.log("Error sending email verification: ", error.code);
        }
      }
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Email already in use", "Please try again.");
      } else {
        Alert.alert("Something went wrong", "Please try again.");
        console.log("Error code: ", error.code);
      }
    });
};

// Login user with email and password
export const loginUser = async (user, password) => {
  await signInWithEmailAndPassword(FIREBASE_AUTH, user.email, password)
    .then(async (userCredential) => {
      user.id = userCredential.user.uid;
      if (userCredential.user.emailVerified) {
        user.isVerified = true;
      } else {
        Alert.alert("Please verify your email");
        try {
          await sendEmailVerification(userCredential.user);
        } catch (error) {
          console.log("Error sending email verification: ", error);
        }
      }
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found") {
        Alert.alert("User not found", "Please register.");
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Incorrect password", "Please try again.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Invalid email", "You must enter a valid email.");
      } else {
        Alert.alert("Something went wrong", " Please try again.");
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
      lastName: user.lastName,
      firstName: user.firstName,
      avatar: user.avatar,
      email: user.email,
      id: user.id,
      isVerified: user.isVerified,
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
      user.lastName = documentData.lastName;
      user.firstName = documentData.firstName;
      user.avatar = documentData.avatar;
      user.email = documentData.email;
      user.isVerified = documentData.isVerified;
    } else {
      // Document does not exist
      console.log("User does not exist");
      return null;
    }
  } catch (error) {
    return null;
  }
};

// Update user to firestore
export const updateUserDocumentToFirestore = async (user) => {
  try {
    await updateDoc(doc(FIRESTORE_DB, "User", user.docID), {
      lastName: user.lastName,
      firstName: user.firstName,
      avatar: user.avatar,
      email: user.email,
      isVerified: user.isVerified,
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
