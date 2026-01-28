import Header from "./Header/Header";
import { Outlet } from "react-router";

const Main = () => {

  return (
    <>

      <Header />
      <Outlet />

    </>
  )

}

export default Main;