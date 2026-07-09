import "./Login.css";
import {
  FaUser,
  FaEnvelope,
  FaLock
} from "react-icons/fa";

function Register() {

  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-left">

          <h1>Join Chefora 🍴</h1>

          <p>
            Create an account to save recipes,
            upload dishes and connect with food lovers.
          </p>

        </div>

        <div className="auth-right">

          <h2>Create Account</h2>

          <form>

            <div className="input-box">

              <FaUser />

              <input
                type="text"
                placeholder="Full Name"
              />

            </div>

            <div className="input-box">

              <FaEnvelope />

              <input
                type="email"
                placeholder="Email"
              />

            </div>

            <div className="input-box">

              <FaLock />

              <input
                type="password"
                placeholder="Password"
              />

            </div>

            <button type="submit">
              Register
            </button>

            <p className="switch-page">
              Already have an account?
              <a href="/login"> Login</a>
            </p>

          </form>

        </div>

      </div>

    </div>

  );
}

export default Register;