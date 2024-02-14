import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'
import "./Home.css"

export default function Home({ children }) {
  return (
    <div className="home-container">
      <nav>
        <NavLink to="/threads/all">All Threads</NavLink>
        <NavLink to="/threads/popular/likes">Most Liked</NavLink>
        <NavLink to="/threads/popular/comments">Most commented</NavLink>
        <NavLink to="/threads/newest">Newest</NavLink>
      </nav>
      {children}
    </div>
  );
}

Home.propTypes = {
  children: PropTypes.any
}