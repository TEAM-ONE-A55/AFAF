import { useState } from "react";
import { loginUser } from "../../services/auth.service";
import { NavLink } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Email" /> <br />
        <input type="password" placeholder="Password" /> <br />
        <button onClick={loginUser}>Login</button> No account yet?
        <NavLink to="/register">Register now</NavLink>
      </form>
    </div>
  );
}
