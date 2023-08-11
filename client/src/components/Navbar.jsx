import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Navbar = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const getUserData = async () => {
    const response = await fetch(`${import.meta.env.VITE_URL}/profile`, {
      credentials: "include",
    });
    if (response.ok) {
      const userData = await response.json();
      setUserInfo(userData);
    } else {
      setUserInfo(null);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_URL}/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  return (
    <nav className="flex items-center justify-between max-w-2xl mx-auto my-12">
      <Link to={"/"} className="font-bold text-2xl uppercase">
        Blog.io
      </Link>
      <div className="flex items-center gap-2">
        {userInfo ? (
          <>
            <Link
              to={"/post-create"}
              className="px-3 py-1 font-medium text-lg border-2 border-black bg-black text-white"
            >
              Create Post
            </Link>
            <p
              onClick={logout}
              to={"/logout"}
              className="px-3 py-1 font-medium text-lg border-2 border-black cursor-pointer"
            >
              Logout
            </p>
          </>
        ) : (
          <>
            <Link
              to={"/auth?mode=login"}
              className="px-3 py-1 font-medium text-lg border-2 border-black"
            >
              Login
            </Link>
            <Link
              to={"/auth?mode=register"}
              className="px-3 py-1 font-medium text-lg border-2 border-black bg-black text-white"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
