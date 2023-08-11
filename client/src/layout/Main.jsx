import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <>
      <Navbar />
      <section className=" max-w-2xl mx-auto">
        <Outlet />
      </section>
    </>
  );
};

export default Main;
