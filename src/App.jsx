// Import global styles
import "./App.css";
// Import hooks from React for state and side effects
import { useState, useEffect } from "react";
// Import components from react-router-dom for routing
import { Routes, Route, Link } from "react-router-dom";
// Import page/layout components
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import NotFoundPage from "./components/notfoundpage";
import DashBoard from "./components/dash";
import Profile from "./components/profile";
import Contact from "./components/contact";
// Import the component for protecting routes
import Protect from "./components/protect";
import ResetPassword from "./components/resetpassword";

// The main App component that acts as the root of the application
function App() {
  // State to track whether the user is logged in or not
  const [isLoggedin, setisLoggedin] = useState(false);

  // useEffect hook to check the user's authentication status when the component mounts
  useEffect(() => {
    // Check for the authentication token in localStorage
    const token = localStorage.getItem("token");

    // If no token is found, the user is not logged in
    if (!token) {
      setisLoggedin(false);
      return;
    }

    // If a token is found, set the login status to true
    setisLoggedin(true);
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    // Main container for the application
    <div className="hero">
      {/* Navigation bar */}
      <div className="navbar">
        {/* Link to the Home page */}
        <Link to="/" id="home">
          HOME
        </Link>
        {/* Conditionally render navigation links based on login status */}
        {isLoggedin ? (
          // If the user is logged in, show a link to the Dashboard
          <div className="stuff">
            <Link to="/DashBoard" id="signin">
              DashBoard
            </Link>
          </div>
        ) : (
          // If the user is not logged in, show links to Register and Log In
          <div className="stuff">
            <Link to="/Register" id="signin">
              Register
            </Link>
            <Link to="/login" id="login">
              LOG IN
            </Link>
          </div>
        )}
      </div>

      {/* The Routes component defines the application's routing structure */}
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<Home />} />
        {/* Route for the registration page */}
        <Route path="/Register" element={<Register />} />
        {/* Route for the login page */}
        <Route path="/login" element={<Login />} />

        {/* Protected route for the contact page. Only accessible when logged in. */}
        <Route
          path="/contact"
          element={
            // The Protect component wraps the Contact component to guard the route
            <Protect>
              <Contact />
            </Protect>
          }
        />

        {/* Protected route for the dashboard. Only accessible when logged in. */}
        <Route
          path="/DashBoard"
          element={
            // The Protect component wraps the DashBoard component
            <Protect>
              <DashBoard />
            </Protect>
          }
        />

        {/* Protected route for the user profile. Only accessible when logged in. */}
        <Route
          path="/Profile"
          element={
            // The Protect component wraps the Profile component
            <Protect>
              <Profile />
            </Protect>
          }
        />

        {/* Route for resetting the password, which includes a token in the URL */}
        <Route path="/api/reset-password/:token" element={<ResetPassword />} />

        {/* A catch-all route to show a 404 Not Found page for any other URL */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
