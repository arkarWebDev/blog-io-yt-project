import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layout/Main";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import CreatePage from "./pages/CreatePage";
import { UserContextProvider } from "./UserContext";
import { checkLogin } from "./utils/checklogin";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/auth",
          element: <AuthPage />,
        },
        {
          path: "/post/:id",
          element: <DetailPage />,
        },
        {
          path: "/post-create",
          element: <CreatePage />,
          loader: checkLogin,
        },
        {
          path: "/post-edit/:id",
          element: <EditPage />,
          loader: checkLogin,
        },
      ],
    },
  ]);
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
};

export default App;
