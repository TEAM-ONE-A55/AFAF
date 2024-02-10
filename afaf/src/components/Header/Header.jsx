import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div>
      {/* <p>Logo</p> */}
      {/* <p>Input</p>
            <p>Login</p> */}
      <nav>
        <span>Logo</span>
        <input type="text" />
        <NavLink to="/login">Login</NavLink>
      </nav>
    </div>
  );
}
