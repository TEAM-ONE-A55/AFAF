import { NavLink } from "react-router-dom";

export default function Navi () {
    return (
        <div>
        <NavLink to="/popular">Popular</NavLink>
        <NavLink to="/all-threads">All threads</NavLink>
        <NavLink to="/newest">Newest</NavLink>
        </div>
    )
}