import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../Firebase-Authentication/FirebaseAuthentication";
import { useState } from "react";

const Main = () => {

  // How to use Firebase Authentication system for Google sign in .
  const GoggleAuthentication = new GoogleAuthProvider();

  // How to show the user infomation using Firebase Authentication system .
  const [UserInfo, setUserInfo] = useState(null);

  // How to use Firebase Authentication system for Google sign in .
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

  // How to use Firebase Authentication system for Email sign in .

  const handelEmailSignInAuthentication = e => {
    e.preventDefault();

    const Email = e.target.Email.value;
    const Password = e.target.Password.value;

    console.log('Email : ', Email, 'Password : ', Password)
  }


  return (
    <>
      {/* Conditional Authentication Button switch */}
      {
        UserInfo ?
          <>
            {/* How to use Firebase Authentication system for Google sign in . */}
            <button onClick={handelGoogleSignOutAuthentication} className="btn btn-primary">Sign Out From Google</button>
          </>
          :
          <>
            {/* How to use Firebase Authentication system for Google sign in . */}
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

      {/* How to use Firebase Authentication system for Email sign in . */}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign in now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form className="fieldset" onSubmit={handelEmailSignInAuthentication}>
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" name="Email" />
                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" name="Password" />
                <div><a className="link link-hover">Forgot password?</a></div>
                <button className="btn btn-neutral mt-4">Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* How to use Firebase Authentication system for Email sign in . */}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Log in now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form className="fieldset" onSubmit={handelEmailSignInAuthentication}>
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" name="Email" />
                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" name="Password" />
                <div><a className="link link-hover">Forgot password?</a></div>
                <button className="btn btn-neutral mt-4">Log in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default Main;