import "./Login.css";
import { FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-left">

          <h1>Welcome Back 👋</h1>

          <p>
            Login to continue exploring delicious recipes,
            cooking videos and your favorite dishes.
          </p>

        </div>

        <div className="auth-right">

          <h2>Login</h2>

          <form>

            <div className="input-box">

              <FaEnvelope />

              <input
                type="email"
                placeholder="Email Address"
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
              Login
            </button>

            <p className="switch-page">
              Don't have an account?
              <a href="/register"> Register</a>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;