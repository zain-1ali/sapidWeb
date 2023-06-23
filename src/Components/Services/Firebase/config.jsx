
import { initializeApp } from "firebase/app";
import { deleteUser, EmailAuthProvider, getAuth, GoogleAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { getDatabase, ref, remove, update } from "firebase/database";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBSBaq8nsw4Gx0zdXRes4basLXbeDw1uAs",
  authDomain: "sapid-21ca2.firebaseapp.com",
  databaseURL: "https://sapid-21ca2-default-rtdb.firebaseio.com",
  projectId: "sapid-21ca2",
  storageBucket: "sapid-21ca2.appspot.com",
  messagingSenderId: "791934022315",
  appId: "1:791934022315:web:18fa9ca7b3ec3949303dee",
  measurementId: "G-9XVEMNR285"
  // apiKey: "AIzaSyBg_3WWQDJQI5HZdc8ve4Snb-PNl8tvWsk",
  // authDomain: "sapid-e3df5.firebaseapp.com",
  // projectId: "sapid-e3df5",
  // storageBucket: "sapid-e3df5.appspot.com",
  // messagingSenderId: "350003933870",
  // appId: "1:350003933870:web:3c551567d9d4d397f4333f",
  // measurementId: "G-B23VM5EC36"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const storage = getStorage(app)

console.log(auth)


const deleteSignedUser = async (afterdel) => {
  const userId = auth?.currentUser?.uid;
  let provider = localStorage.getItem('provider')
  if (provider == 'emailpass') {
    const credential = EmailAuthProvider.credential(
      // auth.currentUser.email,
      localStorage.getItem('email'),
      localStorage.getItem('pass')
    )

    const result = await reauthenticateWithCredential(
      auth.currentUser,
      credential
    )

    // Pass result.user 
    update(ref(db, "User/" + userId), {
      email: "",
      username: ""
    });
    // 
    await deleteUser(result.user).then(() => {
      afterdel();
      localStorage.removeItem('email')
      localStorage.removeItem('pass')
      localStorage.removeItem('provider')

    }).catch((err) => {
      console.log(err)
    })
  }
  else {
    remove(ref(db, "User/" + userId));
   
    afterdel();
  }
  // console.log("success in deleting")
}

export { auth, provider, db, app, storage, deleteSignedUser };
