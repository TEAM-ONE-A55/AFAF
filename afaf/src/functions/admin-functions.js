import toast from "react-hot-toast";
import { updateUserData } from "../services/users.service";

export const changeRole = async (user, setUser) => {
  if (user.role === "user") {
    await updateUserData(user.handle, "role", "admin");
    setUser({ ...user, role: "admin" });
    toast.success(`User role has been changed to an Admin`);
  } else {
    await updateUserData(user.handle, "role", "user");
    setUser({ ...user, role: "user" });
    toast.success(`User role has been changed to a user`);
  }
};

export const blockUser = async (user, setUser) => {
  if (user.blocked === false) {
    await updateUserData(user.handle, "blocked", true);
    setUser({ ...user, blocked: true });
    toast.success(`User has been successfully blocked.`);
  } else {
    await updateUserData(user.handle, "blocked", false);
    setUser({ ...user, blocked: false });
    toast.success(`User has been successfully unblocked.`);
  }
};
