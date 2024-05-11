import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./Home.css";

export default function Home({ children }) {
  return (
    <div className='home-container'>
      <nav>
        <NavLink
          to='/threads/all'
          className='navlink'
        >
          All Threads
        </NavLink>
        <NavLink
          to='/threads/popular/likes'
          className='navlink'
        >
          Most Liked
        </NavLink>
        <NavLink
          to='/threads/popular/comments'
          className='navlink'
        >
          Most commented
        </NavLink>
        <NavLink
          to='/threads/newest'
          className='navlink'
        >
          Newest
        </NavLink>
      </nav>
      {children}
    </div>
  );
}

Home.propTypes = {
  children: PropTypes.any,
};
