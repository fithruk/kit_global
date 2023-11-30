import { Auth, GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  DocumentData,
} from "firebase/firestore";
import { RootState } from "../Reducers/RootReducer/RootReducer";
import { FormType } from "../FormComponent/FormComponent";
import { PostType } from "../Reducers/PostsReducer/PostsReducer";

const login = async (auth: Auth): Promise<User | undefined> => {
  const provider: GoogleAuthProvider = new GoogleAuthProvider();
  try {
    return (await signInWithPopup(auth, provider)).user;
  } catch (error) {
    console.error("Ошибка при авторизации:", error);
    alert("Произошла ошибка приавторизации. Пожалуйста, попробуйте еще раз.");
  }
};

const addNewPost = async (
  firestore: RootState,
  userData: FormType
): Promise<void> => {
  try {
    await addDoc(collection(firestore.firebaseReducer.firestore, "posts"), {
      ...userData,
    });
  } catch (error) {
    console.error("Ошибка при добавлении нового поста:", error);
    alert(
      "Произошла ошибка при добавлении нового поста. Пожалуйста, попробуйте еще раз."
    );
  }
};

const loadAllPosts = async (firestore: RootState) => {
  try {
    const querySnapshot = await getDocs(
      collection(firestore.firebaseReducer.firestore, "posts")
    );
    const posts: PostType[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, data: doc.data() as FormType });
    });
    console.log(posts);

    return posts;
  } catch (error) {
    console.error("Ошибка при загрузке постов:", error);
    alert(
      "Произошла ошибка при загрузке постов. Пожалуйста, попробуйте еще раз."
    );
  }
};

const loadOnePost = async (
  firestore: RootState,
  id: string
): Promise<DocumentData | undefined> => {
  try {
    const docSnap = await getDoc(
      doc(firestore.firebaseReducer.firestore, "posts", id)
    );

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Ошибка при загрузке поста:", error);
    alert(
      "Произошла ошибка при загрузке поста. Пожалуйста, попробуйте еще раз."
    );
  }
};

const updateExistPost = async (
  firestore: RootState,
  id: string,
  userData: FormType
): Promise<void> => {
  try {
    const docRef = doc(firestore.firebaseReducer.firestore, "posts", id);
    await updateDoc(docRef, userData);
  } catch (error) {
    console.error("Ошибка при обновлении поста:", error);
    alert(
      "Произошла ошибка при обновлении поста. Пожалуйста, попробуйте еще раз."
    );
  }
};

const removeExistingPost = async (
  firestore: RootState,
  id: string
): Promise<void> => {
  try {
    const docRef = doc(firestore.firebaseReducer.firestore, "posts", id);

    await deleteDoc(docRef);
  } catch (error) {
    console.error("Ошибка при удалении поста:", error);
    alert(
      "Произошла ошибка при удалении поста. Пожалуйста, попробуйте еще раз."
    );
  }
};

export {
  login,
  addNewPost,
  loadAllPosts,
  loadOnePost,
  updateExistPost,
  removeExistingPost,
};
