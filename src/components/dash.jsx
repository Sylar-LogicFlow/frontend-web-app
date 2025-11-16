// Import shared styles.
import "../App.css";
// Import Material-UI components for icons.
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import CallIcon from "@mui/icons-material/Call";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
// Import Link for client-side navigation.
import { Link } from "react-router-dom";
// Import React hooks for state and side effects.
import { useState, useEffect } from "react";

// Custom HomeIcon component created using SvgIcon.
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

// Function to handle user logout.
const handleLogout = () => {
  // Remove the authentication token from localStorage.
  localStorage.removeItem("token");
  // Redirect the user to the login page.
  window.location.href = "/login";
};

// * Dummy Data * \\
// The main Dashboard component.
export default function DashBoard() {
  // State to hold user data retrieved from localStorage.
  const [userData, setuserData] = useState({});

  // useEffect hook to run once when the component mounts.
  useEffect(() => {
    // Retrieve user information string from localStorage.
    const userInfo = localStorage.getItem("user-Info");

    // If user info exists, parse it and set it to the state.
    if (userInfo) {
      setuserData(JSON.parse(userInfo));
    }
  }, []); // Empty dependency array ensures this runs only on mount.

  return (
    <>
      {/* Main container for the dashboard layout. */}
      <div className="NContanin">
        {/* Sidebar navigation component. */}
        <div className="Nav">
          <div>
            {/* Dashboard link. */}
            <div className="Dash-text">
              <IconButton aria-label="DashBoardIcon">
                <DashboardIcon sx={{ fontSize: 35 }} />
              </IconButton>

              <h2>
                <Link
                  to="/DashBoard"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  DashBoard
                </Link>
              </h2>
            </div>

            {/* Home link. */}
            <div className="Dash-text">
              <IconButton aria-label="HomeIcon">
                <HomeIcon sx={{ fontSize: 35 }} />
              </IconButton>

              <h2>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  Home
                </Link>
              </h2>
            </div>

            {/* Profile link. */}
            <div className="Dash-text">
              <IconButton aria-label="ProfileIcon">
                <PersonIcon sx={{ fontSize: 35 }} />
              </IconButton>

              <h2>
                <Link
                  to="/Profile"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Profile
                </Link>
              </h2>
            </div>

            {/* Contact link. */}
            <div className="Dash-text">
              <IconButton aria-label="callicon">
                <CallIcon sx={{ fontSize: 35 }} />
              </IconButton>

              <h2>
                <Link
                  to="/Contact"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Contact
                </Link>
              </h2>
            </div>
          </div>

          <div>
            {/* Logout button. */}
            <div className="Dash-text">
              <IconButton aria-label="logout">
                <LogoutIcon sx={{ fontSize: 35 }} />
              </IconButton>

              <h2>
                <button
                  className="form-button danger-button"
                  onClick={handleLogout}
                >
                  LOG OUT
                </button>
              </h2>
            </div>
          </div>
        </div>

        {/* Main content area of the dashboard. */}
        <div className="dashboard-container">
          {/* Header section with a welcome message. */}
          <div className="dashboard-header">
            <h1>Welcome Back, {userData.name}!</h1>
            <p>Here's a quick overview of your account activity.</p>
          </div>

          {/* Summary cards with dummy data. */}
          <div className="dashboard-summary-cards">
            <div className="card">
              <h3>Profile </h3>
              <p>80% Complete</p>
            </div>
            <div className="card">
              <h3>Messages</h3>
              <p> 3 Unread</p>
            </div>
            <div className="card">
              <h3>Settings</h3>
              <p> Manage Account</p>
            </div>
          </div>

          {/* Main content section with a list of recent activities (dummy data). */}
          <div className="dashboard-main-content">
            <h2>Recent Activity</h2>
            <ul>
              <li>You logged in from a new device.</li>
              <li>Your password was changed 2 days ago.</li>
              <li>You updated your profile picture.</li>
              <li>New message received from 'Admin'.</li>
              <li>Your monthly subscription has been renewed.</li>
              <li>You successfully updated your profile information.</li>
              <li>Security alert: A new device was added to your account.</li>
              <li>Payment of $9.99 for premium plan was successful.</li>
              <li>New Feature: Dark mode is now available in settings!</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Shared footer component. */}
      <div className="footer">
        <p>© 2025 My App — All Rights Reserved</p>
        <div className="socials">
          <h2>Developed By: Sylar</h2>
        </div>
      </div>
    </>
  );
}
