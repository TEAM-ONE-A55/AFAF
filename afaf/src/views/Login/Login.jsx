import { useState } from "react";
import { loginUser } from "../../services/auth.service";
import { NavLink } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    loginUser(email, password).catch((error) => {
      console.log(error);
    });
  };
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br />
        <button onClick={login}>Login</button> No account yet?
        <NavLink to="/register">Register now</NavLink>
      </form>
    </div>
  );
}
