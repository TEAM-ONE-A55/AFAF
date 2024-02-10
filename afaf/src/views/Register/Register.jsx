import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserHandle,
  getUserByHandle,
} from "../../services/users.service";
import { registerUser } from "../../services/auth.service";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const updateForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
  };

  const register = async () => {
    // TODO Validate inputs
    try {
      const user = await getUserByHandle(form.username);
      if (user.exists()) {
        return alert("This username is already taken!");
      }
      const credentials = await registerUser(form.email, form.password);
      await createUserHandle(form.username, credentials.user.uid, form.email);
      // alert('Thank you!')
      navigate(-1);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="registration">
      <label htmlFor="registration-username">Username: </label>
      <input
        type="text"
        id="registration-username"
        name="registration-username"
        value={form.username}
        onChange={updateForm("username")}
      />
      <br />
      <br />
      <label htmlFor="registration-email">Email: </label>
      <input
        type="text"
        id="registration-email"
        name="registration-email"
        value={form.email}
        onChange={updateForm("email")}
      />
      <br />
      <br />
      <label htmlFor="registration-password">Password: </label>
      <input
        type="text"
        id="registration-password"
        name="registration-password"
        value={form.password}
        onChange={updateForm("password")}
      />
      <br />
      <br />
      <button onClick={register}>Create account</button>
    </div>
  );
}
