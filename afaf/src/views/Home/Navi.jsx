import { NavLink } from "react-router-dom";

export default function Navi() {

  return (
    <div>
      <NavLink to="/all-threads">All Threads</NavLink>
      <NavLink to="/popular">Popular</NavLink>
      <NavLink to="/newest">Newest</NavLink>
    </div>
  );
}
