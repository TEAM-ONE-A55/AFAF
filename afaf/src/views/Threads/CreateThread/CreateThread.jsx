import "./CreateThread.css";
import { useState, useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import Avatar from "../../../components/Avatar/Avatar";

export default function CreateThread () {

    const { user, userData } = useContext(AppContext);
    const navigate = useNavigate();

    const [selected, setSelected] = useState('post');

    const handleThreadTypeNav = type => {
        setSelected(type);
    }

    if (user) {
        return (
            <div className="create-thread-container">
                <h2>Create Thread</h2>
                <hr />
                <div className="create-thread-container-content">
                    <div className="create-thread-left-side">
                        <div className="create-thread-user">
                            <Avatar
                                Width="50px"
                                Height="50px"
                                url={userData.avatar}
                                onClick={() => navigate("/profile")}
                            />
                            <h3>{userData.handle}</h3>
                        </div>
                        <div className="create-thread-type">
                            <nav>
                                <span className={selected === 'post' ? "create-thread-nav-active" : ""} onClick={() => handleThreadTypeNav('post')}>Post</span>
                                <span className={selected === 'image' ? "create-thread-nav-active" : ""} onClick={() => handleThreadTypeNav('image')}>Image</span>
                                <span className={selected === 'url' ? "create-thread-nav-active" : ""} onClick={() => handleThreadTypeNav('url')}>Link</span>
                            </nav>
                        </div>
                    </div>
                    <div className="create-thread-right-side">
                        Community guidelines////
                    </div>
                </div>
            </div>
        )
    } else return <Navigate replace to="/login" />
}