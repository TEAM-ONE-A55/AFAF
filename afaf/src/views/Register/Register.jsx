import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserHandle, getUserByHandle } from "../../services/users.service";
import { registerUser } from "../../services/auth.service";
import Button from "../../components/Button/Button";
import "./Register.css";
import toast from "react-hot-toast";
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH } from "../../constants/constants";

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
    if (form.name.length < MIN_NAME_LENGTH || form.name.length > MAX_NAME_LENGTH) {
      return toast.error("Please enter a full name that is between 4 and 32 characters long.");
    }
    if (!form.username) return toast.error("Uh oh! Don't forget your username!");

    try {
      const user = await getUserByHandle(form.username);
      if (user.exists()) {
        return toast.error("Oops! This username is already taken!");
      }

      const credentials = await registerUser(form.email, form.password);
      await createUserHandle(form.username, credentials.user.uid, form.email, form.name);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
      return toast.success("Congratulations! Your account has been successfully created!");
    } catch (e) {
      if (e.message === "Firebase: Error (auth/missing-password).")
        return toast.error(
          "Oops! Looks like you forgot to enter a password. Let's add one for security!"
        );
      if (e.message === "Firebase: Error (auth/invalid-email).")
        return toast.error(
          "It seems the email you entered is invalid. Please double-check and try again."
        );
      if (e.message === "Firebase: Password should be at least 6 characters (auth/weak-password).")
        return toast.error("Oops! Your password should be at least 6 characters long!");

      if (e.message === "Firebase: Error (auth/email-already-in-use).") {
        return toast.error("Oops! Email already in use. Try another or log in.");
      }
      console.log(e.message);
    } finally {
      // navigate(-1);
    }
  };

  const handleOnKeyDown = (event) => {
    if (event.key === "Enter") return register();
  };

  return (
    <div className='register-container'>
      <h1>Sign up</h1>
      <div className='register-inputs-wrapper'>
        <label htmlFor='registration-name'>Name: </label>
        <input
          type='text'
          id='registration-name'
          name='registration-name'
          value={form.name}
          onChange={updateForm("name")}
          placeholder='Enter your full name'
          onKeyDown={handleOnKeyDown}
        />
        <br />
        <br />
        <label htmlFor='registration-username'>Username: </label>
        <input
          type='text'
          id='registration-username'
          name='registration-username'
          value={form.username}
          onChange={updateForm("username")}
          placeholder='Enter a username'
          onKeyDown={handleOnKeyDown}
        />
        <br />
        <br />
        <label htmlFor='registration-email'>Email: </label>
        <input
          type='text'
          id='registration-email'
          name='registration-email'
          value={form.email}
          onChange={updateForm("email")}
          placeholder='Enter your email'
          onKeyDown={handleOnKeyDown}
        />
        <br />
        <br />
        <label htmlFor='registration-password'>Password: </label>
        <input
          type='password'
          id='registration-password'
          name='registration-password'
          value={form.password}
          onChange={updateForm("password")}
          placeholder='Create a strong password'
          onKeyDown={handleOnKeyDown}
        />
        <br />
        <br />
      </div>
      <Button onClick={register}>Sign up</Button>
    </div>
  );
}
