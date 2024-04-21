import auth from "../FirebaseConfig";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    // -------- State ---------
    const [LogInError, setLogInError] = useState("")
    const [success, setSuccess] = useState("");
    const emailRef = useRef(null);

    // ---------- Handle Log in ------------
    const handleLogIn = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        setLogInError("");
        setSuccess("");
        // --------- Log in with email password ----------
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          setSuccess("Log in Successfully")
        })
        .catch((error) => {
          const errorMessage = error.message;
          setLogInError(errorMessage);
        });
    }
    const handleResetPassword = () => {
        const email = emailRef.current.value;
        console.log(email)
        if(!email){
            console.log('send reset email', emailRef.current.value)
            return;
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setLogInError('Please Write a valid email address')
            return;
        }
        sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          alert("Password reset email sent!")
        })
        .catch((error) => {
          const errorMessage = error.message;
          setLogInError(errorMessage)
        });
    }
    return (
        <div className="hero rounded-xl bg-base-200">
          <div className="hero-content flex-col">
          <h1 className="text-5xl font-semibold">Log in Here.</h1>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleLogIn} className="card-body w-96">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input 
                  type="email" 
                  name="email"
                  ref={emailRef} 
                  placeholder="email" 
                  className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                  <label className="label">
                    <a onClick={handleResetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-info">Login</button>
                </div>
                <div className="flex items-center">
                    <span>New user, I don't have account <Link className="text-success" to={"/signup"}>Sign up</Link></span>
                </div>
                <div className="flex">
                    <span className="text-red-600">
                        {LogInError}
                    </span>
                    <span className="text-success">
                        {success}
                    </span>
                </div>
              </form>
            </div>
          </div>
        </div>
    );
};

export default Login;