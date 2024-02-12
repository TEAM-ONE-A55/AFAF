import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserHandle,
  getUserByHandle,
} from "../../services/users.service";
import { registerUser } from "../../services/auth.service";
import Button from "../../components/Button/Button";
import "./Register.css";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();

  const updateForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
  };

  const register = async () => {
    if (form.name.length < 4 || form.name.length > 32) {
      return toast.error(
        "Please enter a full name that is between 4 and 32 characters long."
      );
    }
    if(!form.username) return  toast.error("Uh oh! Don't forget your username!")

      try {
        const user = await getUserByHandle(form.username);
        if (user.exists()) {
          return toast.error("Oops! This username is already taken!");
        }

        const credentials = await registerUser(form.email, form.password);
        await createUserHandle(
          form.username,
          credentials.user.uid,
          form.email,
          form.name
        );
        setTimeout(() => {
          navigate(-1);
        }, 2000);
        return toast.success(
          "Congratulations! Your account has been successfully created!"
        );
      } catch (e) {
        if (e.message === "Firebase: Error (auth/missing-password).")
          return toast.error(
            "Oops! Looks like you forgot to enter a password. Let's add one for security!"
          );
        if (e.message === "Firebase: Error (auth/invalid-email).")
          return toast.error(
            "It seems the email you entered is invalid. Please double-check and try again."
          );
        if (
          e.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        )
          return toast.error(
            "Oops! Your password should be at least 6 characters long!"
          );

          if(e.message === 'Firebase: Error (auth/email-already-in-use).') {
            return toast.error("Oops! Email already in use. Try another or log in.")
          }
        console.log(e.message);
      }
  };
  return (
    <div className="registration">
      <div className="registration-form">
        <label htmlFor="registration-name">Name: </label>
        <input
          type="text"
          id="registration-name"
          name="registration-name"
          value={form.name}
          onChange={updateForm("name")}
          placeholder="Enter your full name"
        />
        <br />
        <br />
        <label htmlFor="registration-username">Username: </label>
        <input
          type="text"
          id="registration-username"
          name="registration-username"
          value={form.username}
          onChange={updateForm("username")}
          placeholder="Pick your username"
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
          placeholder="Type in your email"
        />
        <br />
        <br />
        <label htmlFor="registration-password">Password: </label>
        <input
          type="password"
          id="registration-password"
          name="registration-password"
          value={form.password}
          onChange={updateForm("password")}
          placeholder="Create a strong password"
        />
        <br />
        <br />
        <Button onClick={register}>Sign up</Button>
      </div>
    </div>
  );
}
