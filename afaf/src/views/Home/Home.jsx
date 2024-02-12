import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'

export default function Home({ children }) {
  return (
    <div>
      <span>
        <NavLink to="/threads/all">All Threads</NavLink>
        <NavLink to="/threads/popular/likes">Most Liked</NavLink>
        <NavLink to="/threads/popular/comments">Most commented</NavLink>
        <NavLink to="/threads/newest">Newest</NavLink>
      </span>
      {children}
    </div>
  );
}

Home.propTypes = {
  children: PropTypes.any
}