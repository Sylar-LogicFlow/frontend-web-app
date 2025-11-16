// Import React hooks and components.
import { useState } from "react";
// Import shared styles.
import "../App.css";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import CallIcon from "@mui/icons-material/Call";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
// Import hook for displaying notifications.
import { useSnackbar } from "notistack";

// Custom HomeIcon component.
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

// The Contact component, which includes a contact form and dashboard navigation.
export default function Contact() {
  // Hook to display snackbar notifications.
  const { enqueueSnackbar } = useSnackbar();

  // State for the contact form data.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handles the submission of the contact form.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate that all fields are filled.
    if (!formData.name || !formData.email || !formData.message) {
      enqueueSnackbar("Please fill all the fields", { variant: "warning" });
      return;
    }

    // Placeholder for actual submission logic.
    // For now, it just logs the data to the console.
    // TODO: Implement actual form submission logic here (e.g., send to an API).
    console.log("Contact form submitted:", formData);

    // Show a success message and reset the form.
    enqueueSnackbar("Thank you for your message!", { variant: "success" });
    setFormData({ name: "", email: "", message: "" });
  };

  // Function to handle user logout.
  const handleLogout = () => {
    // Remove the token from localStorage.
    localStorage.removeItem("token");

    // Redirect to the login page.
    window.location.href = "/login";
  };

  return (
    <>
      {/* Main container for the page layout. */}
      <div className="NContanin">
        {/* Sidebar navigation. This is duplicated across dashboard pages. */}
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

            {/* Contact link (current page). */}
            <div className="Dash-text">
              <IconButton aria-label="delete">
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
              <IconButton aria-label="delete">
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

        {/* Container for the contact form. */}
        <div className="form-container">
          {/* The contact form itself. */}
          <form className="form" onSubmit={handleSubmit}>
            <h2>Contact Us</h2>

            <div className="form-group">
              <TextField
                // Input for the user's name.
                label="Your Name"
                variant="standard"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                fullWidth
              />
            </div>

            <div className="form-group">
              <TextField
                // Input for the user's email.
                label="Your Email"
                type="email"
                variant="standard"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                fullWidth
              />
            </div>

            <div className="form-group">
              <TextField
                // Text area for the user's message.
                label="Message"
                variant="standard"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                multiline
                rows={3}
                fullWidth
              />
            </div>

            {/* Form submission button. */}
            <button type="submit" className="form-button">
              Send Message
            </button>
          </form>
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
