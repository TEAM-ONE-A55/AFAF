import { useContext, useEffect, useState } from "react";
import { loginUser } from "../../services/auth.service";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Button from "../../components/Button/Button";

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
      // TODO validations and client errors
      setContext({ user: credentials.user, userData: null });
      navigate(location.state?.from.pathname || "/");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div>
      <h1>Login</h1>

      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <Button onClick={login}>Login</Button>
      <p>
        No account yet? <NavLink to="/register">Register now</NavLink>
      </p>
    </div>
  );
}
