import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorHandel from "../components/HandelError/ErrorHandel";
import MainSection from "../components/Main-Section/MainSection";
import Home from "../components/Main-Section/Home/Home";
import EmailSignIn from "../components/Main-Section/Home/EmailSignIn/EmailSignIn";
import EmailLogIn from "../components/Main-Section/Home/EmailLogIn/EmailLogIn";

const React_Router = () => {

    const router = createBrowserRouter([
        {
            path: "/",

            element: <MainSection />,

            errorElement: <ErrorHandel />,

            children: [
                {
                    path: "/Home",
                    Component: Home
                },
                {
                    path: "/Email-Sign-In",
                    Component: EmailSignIn
                },
                {
                    path: "/Email-Log-In",
                    Component: EmailLogIn
                }
            ]
        }
    ])

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default React_Router;