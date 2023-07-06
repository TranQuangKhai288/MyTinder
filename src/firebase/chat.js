import { get } from "firebase/database";

export const checkReference = async (ref) => {
  try {
    const snapshot = await get(ref);
    return true;
  } catch {
    return false;
  }
};
