import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/users.service";
import { Link, useNavigate } from "react-router-dom";
import "./Admin.css"

export function Admin() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getAllUsers()
      .then((users) => users.map((user) => user.val()))
      .then((userData) => setUsers(userData));
  }, []);

  console.log(users);

  return (
    <div className="admin-container">
      <Link>See all users</Link>
      {users.map((user) =>
          <div key={user.handle}>
         <img src={user.avatar} alt="" />
            <p onClick={() => navigate(`/profile/${user.handle}`)}>{user.handle}</p>
          </div>
        
      )}
    </div>
  );
}
