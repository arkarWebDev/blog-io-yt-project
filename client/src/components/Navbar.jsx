import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-10 2xl:px-96">
      <Link to={"/"} className="font-bold text-2xl uppercase">
        Blog.io
      </Link>
      <div className="flex items-center gap-2">
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
      </div>
    </nav>
  );
};

export default Navbar;
