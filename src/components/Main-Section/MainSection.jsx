import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../Firebase-Authentication/FirebaseAuthentication";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRef, useState } from "react";

const Main = () => {

  //How to add show password and hide password in Firebase Authentiocation system .
  const [ShowPassword, setShowPassword] = useState(false);





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





  // How to show the user infomation using Firebase Authentication system .
  const [EmailSigninUserInfo, setEmailSigninUserInfo] = useState([]);

  // How to show Sign in success massage .
  const [EmailSigninSuccessMassage, setEmailSigninSuccessMassage] = useState('');

  // How to show Email exist massage .
  const [EmailSigninExistsMassage, setEmailSigninExistsMassage] = useState('');

  // How to show Password conditional massage .
  const [PasswordRequirementsMassage, setPasswordRequirementsMassage] = useState('');

  // how to make a cheack box Requered in Authentiocation System .
  const [CheckBoxRequeredMassage, setCheckBoxRequeredMassage] = useState('');

  // How to use Firebase Authentication system for Email sign in .
  const handelEmailSignInAuthentication = e => {

    // Stop the Form from refreshing the website when the button is clicked .
    e.preventDefault();

    // Get the Email value from the email input field .
    const Email = e.target.Email.value;

    // Get the Password value from the password input field .
    const Password = e.target.Password.value;

    // how to make a cheack box requir in Authentiocation System .
    const CheckBox = e.target.CheckBox.checked;
    console.log(CheckBox);
    // setCheckBoxRequerMassage(!CheckBox);
    if (!CheckBox) {
      setCheckBoxRequeredMassage("Please Accept Our Terms & Condition");
      return;
    }
    else {
      // Clear the existing State when the form button is clicked .
      setCheckBoxRequeredMassage('');
    }

    // Clear the existing State when the form button is clicked .
    setEmailSigninSuccessMassage('');
    setEmailSigninExistsMassage('');
    setPasswordRequirementsMassage('');

    // Conditional check of Password requirements .
    const PasswordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (PasswordRegExp.test(Password) === false) {
      setPasswordRequirementsMassage(
        "Password must be at least 8 characters long and include uppercase, lowercase, and a number."
      );
    }

    // Firebase Email sign in function .
    createUserWithEmailAndPassword(auth, Email, Password)
      .then(Result => {
        const UserData = Result.user;
        setEmailSigninUserInfo(UserData);

        // how to add an Email Verification functionality using Firebase Authentication . 
        sendEmailVerification(Result.user)
          .then(() => {
            // How to show Sign in success massage .
            setEmailSigninSuccessMassage('Sign in successfull !! We have Send you an Email Verification link , Pleasy varify your Eamil !!');
          })
          .catch(() => {
            // send a Error massage .
          })

        console.log('Sign in data : ', UserData);
      })
      .catch(Error => {
        console.log(Error.message);

        // How to show Firebase error message .
        setEmailSigninExistsMassage('This email already exists !!');
      })

    console.log('Sign in Email : ', Email, 'Sign in Password : ', Password);
  }





  // How to show the user infomation using Firebase Authentication system .
  const [EmailLoginUserInfo, setEmailLoginUserInfo] = useState([]);

  // how to send an Error massage in log in .
  const [CheackError, setCheackError] = useState('');

  // how to send an Success massage in log in .
  const [CheackSuccess, setCheackSuccess] = useState('');

  // How to use Firebase Authentication system for Email log in .
  const handelEmailLogInAuthentication = e => {

    // Stop the Form from refreshing the website when the button is clicked .
    e.preventDefault();

    // Get the Email value from the email input field .
    const Email = e.target.Email.value;

    // Get the Password value from the password input field .
    const Password = e.target.Password.value;

    // Clear the existing State when the form button is clicked .
    setCheackError('');
    setCheackSuccess('');

    // Firebase Email log in function .
    signInWithEmailAndPassword(auth, Email, Password)
      .then(Result => {
        const UserData = Result.user;
        setEmailLoginUserInfo(UserData);
        console.log('Log in data : ', UserData);

        // how to cheack if the User was Varifyed .
        if (!UserData.emailVerified) {
          setCheackError('Please varify you Email !!');
        }
        else {
          setCheackSuccess('You have successfuly Log in !!');
        }

      })
      .catch(Error => {
        console.log(Error.message);
        setCheackError('Wrong Email or Password !!');
      })

    console.log('Log in Email : ', Email, 'Log in Password : ', Password);
  }

  const getEmail = useRef();

  const handelPasswordResetEmail = () => {
    console.log(getEmail.current.value);
    const Email = getEmail.current.value;

    sendPasswordResetEmail(auth, Email)
      .then(() => {
        // how to a Password Reset Email massage .
        setCheackSuccess('a Password Reset Email has send to your email . please cheack your email !!');
      })
      .catch(() => {
        // send a Error massage .
      })
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

                {/* How to add show password and hide password in Firebase Authentiocation system . */}
                <label className="label">Password</label>
                <div className="flex">
                  <input type={ShowPassword ? 'text' : 'password'} className="input" placeholder="Password" name="Password" />
                  <div onClick={() => setShowPassword(!ShowPassword)} className="btn btn-ghost">{ShowPassword ? <FaEyeSlash /> : <FaEye />}</div>
                </div>

                {/* how to make a cheack box requir in Authentiocation System . */}
                <label className="label">
                  <input type="checkbox" name="CheckBox" className="checkbox" />
                  Accept Terms & Conditions
                </label>

                <button className="btn btn-neutral mt-4">Sign in</button>
              </form>
            </div>
          </div>

          {/* Show sign‑in message on conditional basis . */}
          {
           /* if */ CheckBoxRequeredMassage ? <p className="text-red-500">{CheckBoxRequeredMassage}</p>

      /* else if */ : PasswordRequirementsMassage ? <p className="text-red-500">{PasswordRequirementsMassage}</p>

      /* else if */ : EmailSigninSuccessMassage ? <h1 className="text-2xl text-green-700">{EmailSigninSuccessMassage}</h1>

         /* else */ : EmailSigninExistsMassage && <h1 className="text-2xl text-red-500">{EmailSigninExistsMassage}</h1>

          }

          {/* How to show the user infomation using Firebase Authentication system . */}
          {EmailSigninUserInfo.email}
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
                <input type="email" className="input" placeholder="Email" name="Email" ref={getEmail} />

                {/* How to add show password and hide password in Firebase Authentiocation system . */}
                <label className="label">Password</label>
                <div className="flex">
                  <input type={ShowPassword ? 'text' : 'password'} className="input" placeholder="Password" name="Password" />
                  <div className="btn btn-ghost" onClick={() => setShowPassword(!ShowPassword)}>{ShowPassword ? <FaEyeSlash /> : <FaEye />}</div>
                </div>

                <div><a onClick={handelPasswordResetEmail} className="link link-hover">Forgot password?</a></div>
                <button className="btn btn-neutral mt-4">Log in</button>
              </form>
            </div>
          </div>

          {/* how show Error or Success massage . */}
          <h1 className="text-2xl text-red-500">{CheackError}</h1>
          <h1 className="text-2xl text-green-700">{CheackSuccess}</h1>

          {/* How to show the user infomation using Firebase Authentication system . */}
          {EmailLoginUserInfo.email}
        </div>
      </div>
    </>
  )

}

export default Main;