import { get, ref } from "firebase/database";
import { FIREBASE_REALTIME_DB } from "../../firebaseConfig";

export const checkReference = async (ref) => {
  try {
    const snapshot = await get(ref);
    return true;
  } catch {
    return false;
  }
};

export const getRefLength = async (dbRef) => {
  try {
    const snapshot = await get(dbRef);
    const refData = snapshot.val();
    const length = refData ? Object.keys(refData).length : 0;
    return length;
  } catch (error) {
    console.log("Error: ", error);
    return 0;
  }
};
