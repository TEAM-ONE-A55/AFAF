import "./Avatar.css";
import PropTypes from "prop-types";
export default function Avatar({ Width, Height, url, onClick }) {
  return (
    <img
      className="avatar-img"
      onClick={(e) => onClick(e)}
      style={{ width: Width, height: Height, cursor: "pointer"}}
      src={url}
      alt="avatar-default"
    />
  );
}

Avatar.propTypes = {
  Width: PropTypes.string,
  Height: PropTypes.string,
  url: PropTypes.any,
  onClick: PropTypes.func,
};
