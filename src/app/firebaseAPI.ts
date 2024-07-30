import { ref, get, set, update, remove } from 'firebase/database';
import { database } from '../../firebase';

// Define the type for the data you expect to handle
interface FirebaseData {
  id: string;
  [key: string]: any;
}

// Generic function to list data from a specified path
export const listData = async <T>(path: string): Promise<T[]> => {
  const snapshot = await get(ref(database, path));
  const data: Record<string, T> = snapshot.val() || {};
  return Object.values(data);
};

// Generic function to add data to a specified path
export const addData = async <T extends FirebaseData>(path: string, data: T): Promise<T> => {
  const dataRef = ref(database, `${path}/${data.id}`);
  await set(dataRef, data);
  return data;
};

// Generic function to update data at a specified path
export const updateData = async <T extends FirebaseData>(path: string, data: T): Promise<T> => {
  const dataRef = ref(database, `${path}/${data.id}`);
  await update(dataRef, data);
  return data;
};

// Generic function to delete data from a specified path
export const deleteData = async (path: string, id: string): Promise<string> => {
  const dataRef = ref(database, `${path}/${id}`);
  await remove(dataRef);
  return id;
};
