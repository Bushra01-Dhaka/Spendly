import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import auth from "../Firebase/firebase.config";
export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // create User 
    const createUser = (email, password) => {
       setLoading(true);
       return createUserWithEmailAndPassword(auth,email,password);
    }

    // login User
    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    useEffect(() => {
         const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log(currentUser);
            setLoading(false);
         }) 
         return () => {
            return unSubscribe;
         }
    }, [])

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

     const updateUserProfile = profileInfo => {
      return updateProfile(auth.currentUser, profileInfo);
    }



    const authInfo = {
       user,
       loading,
       createUser,
       logIn,
       logOut,
       updateUserProfile,

    }
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider