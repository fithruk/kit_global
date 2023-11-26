import { Auth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { RootState } from "../Reducers/RootReducer/RootReducer";
import { FormType } from "../FormComponent/FormComponent";

const login = async (auth: Auth) => {
  const provider = new GoogleAuthProvider();
  try {
    return (await signInWithPopup(auth, provider)).user;
  } catch (error) {
    alert("Somethink went wrong...");
  }
};

const addNewPost = async (firestore: RootState, userData: FormType) => {
  try {
    const docRef = await addDoc(
      collection(firestore.firebaseReducer.firestore, "posts"),
      {
        ...userData,
      }
    );
  } catch (error) {
    console.log("error");
  }
};

const loadAllPosts = async (firestore: RootState) => {
  try {
    const querySnapshot = await getDocs(
      collection(firestore.firebaseReducer.firestore, "posts")
    );
    const posts: any = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, data: doc.data() });
    });
    return posts;
  } catch (error) {
    console.log("error");
  }
};

const loadOnePost = async (firestore: RootState, id: string) => {
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
    console.log("error");
  }
};
export { login, addNewPost, loadAllPosts, loadOnePost };
