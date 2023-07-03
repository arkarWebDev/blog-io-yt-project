import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <>
      <Navbar />
      <section className="px-10 2xl:px-96">
        <Outlet />
      </section>
    </>
  );
};

export default Main;
