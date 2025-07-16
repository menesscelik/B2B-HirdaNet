import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import App from "../components/App";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";

export const router= createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <HomePage /> },
            {path: "about", element: <AboutPage /> },
            {path: "contact", element: <ContactPage /> },
            
        ]

    }


])