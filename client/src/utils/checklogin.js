import { redirect } from "react-router-dom";

export const checkLogin = async () => {
  const response = await fetch(`${import.meta.env.VITE_URL}/profile`, {
    credentials: "include",
  });
  if (response.ok) {
    return null;
  } else {
    return redirect("/");
  }
};
