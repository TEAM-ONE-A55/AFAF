import { useContext, useEffect, useState } from "react";
import { loginUser } from "../../services/auth.service";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Button from "../../components/Button/Button";
import toast from "react-hot-toast";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setContext } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate(location.state?.from.pathname || "/");
    }
  }, [location.state?.from.pathname, navigate, user]);

  const login = async () => {
    try {
      const credentials = await loginUser(email, password);

      setContext({ user: credentials.user, userData: null });
      navigate(location.state?.from.pathname || "/");
      toast.success("Welcome back! You've successfully logged in. Enjoy your experience!");
    } catch (e) {
      if (e.message === "Firebase: Error (auth/invalid-email).") {
        return toast.error(
          "Whoops! Looks like the email you entered is not valid. Please check and try again."
        );
      } else if (e.message === "Firebase: Error (auth/missing-password).") {
        console.log(e.message);
        return toast.error(
          "Seems like you forgot to enter your password. Please provide your password to continue."
        );
      } else if (e.message === "Firebase: Error (auth/invalid-credential).") {
        return toast.error(
          "Looks like there's an issue with your login credentials. Please double-check and try again."
        );
      } else {
        console.log(e.message);
        return toast.error(
          "It seems your login credentials are incorrect. Please double-check and try again."
        );
      }
    }
  };

  const handleOnKeyDown = (event) => {
    if (event.key === "Enter") return login();
  };

  return (
    <div className='login-container'>
      <h1>Sign in</h1>
      <div className='login-inputs-wrapper'>
        <label htmlFor='login-email'>Email: </label>
        <input
          id='login-email'
          name='login-email'
          type='text'
          placeholder='Enter your email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          onKeyDown={handleOnKeyDown}
        />
        <br />
        <label htmlFor='login-password'>Password: </label>
        <input
          id='login-password'
          name='login-password'
          type='password'
          placeholder='Enter your password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          onKeyDown={handleOnKeyDown}
        />
        <br />
      </div>
      <Button onClick={login}>Sign in</Button>
      <p>
        Don&apos;t have an account?{" "}
        <NavLink
          className='navlink register-now'
          to='/register'
        >
          Sign up
        </NavLink>
      </p>
    </div>
  );
}
