import { useState } from "react";
import auth from "../FirebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";

// ------------- React icons ---------------
import { RiEyeLine } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Signup = () => {
    // ----------- state start --------------
    const [showPassword, setShowPassword] = useState(false);
    const [signupError, setSignupError] = useState('');
    const [success, setSuccess] = useState('');

    // ---------- handle signup ----------- 
    const handleSignup = e => {
        e.preventDefault();
        setSignupError("");
        setSuccess("");
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name, email, password, accepted);
        // ------- password validation ----------
        if (password.length < 6) {
            setSignupError('Your password should have minimum 6 characters')
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setSignupError('Your password mast be once uppercase characters')
            return;
        }
        else if(!accepted){
            setSignupError('Please accept terms and conditions')
            return;
        }
        // --------- Creat new user or Sign up new users ----------
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            setSuccess("Your account successfully created");
            sendEmailVerification(user)
            
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: "https://i.ibb.co/235McbG/20240315-230400.png"
                  })
                  .then(()=>{
                    console.log("Profile updated")
                  })
                // Email verification sent!
                alert('Email verification sent!')
              });
          })
          .catch((error) => {
            const errorMessage = error.message;
            setSignupError(errorMessage);
          });
    }
    return (
        <div className="hero min-h-screen bg-base-200 rounded-xl">
          <div className="hero-content max-w-3xl flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Sign up now!</h1>
              <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleSignup} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input type="text" name="name" placeholder="Name" className="input input-bordered"/>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <div className="flex items-center justify-between input input-bordered">
                    <input type={showPassword ? "text":"password"} name="password" placeholder="Password" required />
                    <span onClick={()=> setShowPassword(!showPassword)} className="py-2 cursor-pointer">
                        { showPassword ? <RiEyeCloseLine></RiEyeCloseLine> : <RiEyeLine></RiEyeLine> }
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" name="terms" />
                  <label className="label">
                    <span className="label-text">Accept Terms And conditions</span>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-success">Login</button>
                </div>
                <div className="flex items-center">
                    <span>Already have an account <Link className="text-accent" to={"/login"}>Log in</Link></span>
                </div>
                <div className="flex justify-center">
                    <span className="text-red-600">
                        {signupError}
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

export default Signup;