import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../Firebase-Authentication/FirebaseAuthentication";
import { useState } from "react";

const Main = () => {

  // How to use Firebase Authentication system to sign in .
  const GoggleAuthentication = new GoogleAuthProvider();

  // How to show the user infomation using Firebase Authentication system .
  const [UserInfo, setUserInfo] = useState(null);

  // How to use Firebase Authentication system to sign in .
  const handelGoogleSignInAuthentication = () => {
    signInWithPopup(auth, GoggleAuthentication)
      .then(result => {
        console.log(result.user);

        // How to show the user infomation using Firebase Authentication system .
        setUserInfo(result.user);
      })
      .catch(error => {
        console.log(error);
      })
  }

  // How to use Firebase Authentication system to sign out .
  const handelGoogleSignOutAuthentication = () => {
    signOut(auth)
      .then(() => {
        alert('Signed out successfully!');
        setUserInfo(null);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <>
    {/* Conditional Authentication Button switch */}
      {
        UserInfo ?
          <>
            {/* How to use Firebase Authentication system to sign out . */}
            <button onClick={handelGoogleSignOutAuthentication} className="btn btn-primary">Sign Out From Google</button>
          </>
          :
          <>
            {/* How to use Google Firebase Authentication system to sign in . */}
            <button onClick={handelGoogleSignInAuthentication} className="btn btn-primary">Sign In With Google</button>
          </>
      }

      {/* How to show the user infomation using Firebase Authentication system . */}
      {
        UserInfo ?
          <div>
            <img src={UserInfo.photoURL} alt="User Photo" />
            <h3>{UserInfo.displayName}</h3>
          </div>
          :
          <h1 className="text-2xl">No User Info</h1>
      }
    </>
  )

}

export default Main;