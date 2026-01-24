import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../Firebase-Authentication/FirebaseAuthentication";
import { useState } from "react";

const Main = () => {

  // How to declare Firebase Authentication system for Google sign in or log in .
  const GoggleAuthentication = new GoogleAuthProvider();

  // How to show the user infomation using Firebase Authentication system .
  const [GoogleUserInfo, setGoogleUserInfo] = useState([]);


  // How to use Firebase Authentication system for Google sign in or log in .
  const handelGoogleSignInAuthentication = () => {

    // How to use Firebase Authentication system for Google sign in or log in .
    signInWithPopup(auth, GoggleAuthentication)
      .then(result => {
        console.log(result.user);

        // How to show the user infomation using Firebase Authentication system .
        setGoogleUserInfo(result.user);
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
        setGoogleUserInfo(null);
      })
      .catch(error => {
        console.log(error);
      })
  }





  const [EmailUserInfo, setEmailUserInfo] = useState([]);

  // How to show Sign in success massage .
  const [EmailSigninSuccessMassage, setEmailSigninSuccessMassage] = useState('');

  // How to show Email exist massage .
  const [EmailSigninExistsMassage, setEmailSigninExistsMassage] = useState('');

  // How to show Password confirmation massage .
  const [PasswordConfirmationMassage, setPasswordConfirmationMassage] = useState('');


  // How to use Firebase Authentication system for Email sign in .
  const handelEmailSignInAuthentication = e => {

    // Stop the Form from refreshing the website when the button is clicked .
    e.preventDefault();

    // Get the Email value from the email input field .
    const Email = e.target.Email.value;

    // Get the Password value from the password input field .
    const Password = e.target.Password.value;

    // Clear the existing State when the form button is clicked .
    setEmailSigninSuccessMassage('');
    setEmailSigninExistsMassage('');
    setPasswordConfirmationMassage('');

    // Conditional check of password requirements .
    const PasswordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (PasswordRegExp.test(Password) === false) {
      setPasswordConfirmationMassage(
        "Password must be at least 8 characters long and include uppercase, lowercase, and a number."
      );
    }

    // Firebase Email sign in function .
    createUserWithEmailAndPassword(auth, Email, Password)
      .then(Result => {
        const UserData = Result.user;
        setEmailUserInfo(UserData);

        // How to show Sign in success massage .
        setEmailSigninSuccessMassage(UserData);

        console.log('Sign in data : ', UserData);
      })
      .catch(Error => {
        console.log(Error);

        // How to show Firebase error message .
        setEmailSigninExistsMassage(Error.message);
      })

    console.log('Sign in Email : ', Email, 'Sign in Password : ', Password)
  }





  // How to use Firebase Authentication system for Email log in .
  const handelEmailLogInAuthentication = e => {

    // Stop the Form from refreshing the website when the button is clicked .
    e.preventDefault();

    // Get the Email value from the email input field .
    const Email = e.target.Email.value;

    // Get the Password value from the password input field .
    const Password = e.target.Password.value;

    // Firebase Email log in function .
    signInWithEmailAndPassword(auth, Email, Password)
      .then(Result => {
        const UserData = Result.user
        console.log('Log in data : ', UserData);
      })
      .catch(Error => {
        console.log(Error)
      })

    console.log('Log in Email : ', Email, 'Log in Password : ', Password)
  }


  return (
    <>
      {/* Conditional Authentication Button switch */}
      {
        GoogleUserInfo ?
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
        GoogleUserInfo ?
          <div>
            <img src={GoogleUserInfo.photoURL} alt="User Photo" />
            <h3>{GoogleUserInfo.displayName}</h3>
          </div>
          :
          <h1 className="text-2xl">No User Info</h1>
      }

      {/* How to use Firebase Authentication system for Email sign in . */}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Sign in now!</h1>
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

          {/* Show sign‑in message on conditional basis . */}
          {
          /* if */  EmailSigninSuccessMassage ? <h1 className="text-2xl text-green-700">Sign in successfull !!</h1>

      /* else if */ : PasswordConfirmationMassage ? <p className="text-red-500">{PasswordConfirmationMassage}</p>

         /* else */ : EmailSigninExistsMassage && <h1 className="text-2xl text-red-500">This email already exists !!</h1>

          }

          {/* How to show the user infomation using Firebase Authentication system . */}
          {EmailUserInfo.email}
        </div>
      </div>

      {/* How to use Firebase Authentication system for Email log in . */}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Log in now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form className="fieldset" onSubmit={handelEmailLogInAuthentication}>
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