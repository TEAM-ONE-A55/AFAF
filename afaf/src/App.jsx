import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Profile from "./views/Profile/Profile";
import Register from "./views/Register/Register";
import SingleThread from "./views/Threads/SingleThread/SingleThread";
import CreateThread from "./views/Threads/CreateThread/CreateThread";
import Authenticated from "./hoc/Authenticated/Authenticated";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase-config";
import { getUserData } from "./services/users.service";
import { AppContext } from "./context/AppContext";

function App() {
  const [context, setContext] = useState({
    user: null,
    userData: null,
  });

  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      getUserData(user.uid).then((snapshot) => {
        if (snapshot.exists()) {
          setContext({
            user,
            userData: snapshot.val()[Object.keys(snapshot.val())[0]],
          });
        }
      });
    }
  }, [user]);

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ ...context, setContext: setContext }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <Authenticated>
                <Profile />
              </Authenticated>
            }
          />
          <Route path="/single-thread/:id" element={<SingleThread />} />
          <Route
            path="/create-thread"
            element={
              <Authenticated>
                <CreateThread />
              </Authenticated>
            }
          />
        </Routes>
        <Footer />
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
