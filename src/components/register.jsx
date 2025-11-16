// Import the useState hook from React for managing component state.
import { useState } from "react";
// Import the shared stylesheet.
import "../App.css";
// Import the TextField component from Material-UI for form inputs.
import TextField from "@mui/material/TextField";
// Import the Link component from react-router-dom for navigation.
import { Link } from "react-router-dom";
// Import axios for making HTTP requests to the backend API.
import axios from "axios";
// Import the useSnackbar hook from notistack for showing notifications.
import { useSnackbar } from "notistack";

// The Register component, which handles user registration.
export default function Register() {
  // Destructure enqueueSnackbar from useSnackbar to display notifications.
  const { enqueueSnackbar } = useSnackbar();

  // State to hold the form data (username, email, password, confirmPassword).
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Function to handle the form submission.
  const checkHandelsumbmit = async (e) => {
    // Prevent the default form submission behavior which reloads the page.
    e.preventDefault();
    // Validate that all fields are filled.
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setTimeout(() => {
        // Show a warning notification if any field is empty.
        enqueueSnackbar("Should to fill the fields", { variant: "warning" });
      }, 100);
      return;
      // Validate that the password and confirm password fields match.
    } else if (formData.password !== formData.confirmPassword) {
      setTimeout(() => {
        // Show an error notification if passwords don't match.
        enqueueSnackbar("Password does not match", { variant: "error" });
      }, 100);
      return;
      // Validate that the password is at least 6 characters long.
    } else if (formData.password.length < 6) {
      setTimeout(() => {
        // Show an error notification if the password is too short.
        enqueueSnackbar("Password must be at least 6 characters long.", {
          variant: "error",
        });
      }, 100);
      return;
    }

    try {
      // Prepare the payload to be sent to the API.
      const payload = {
        name: formData.username,
        email: formData.email,
        password: formData.password,
      };

      // Configure the request headers.
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Send a POST request to the registration endpoint.
      const response = await axios.post(
        `http://localhost:8000/api/register`,
        payload,
        config
      );

      // Show a success notification with the message from the server.
      enqueueSnackbar(
        response.data.message || "Registration data submitted successfully.",
        { variant: "success" }
      );

      // Store user information in localStorage.
      localStorage.setItem("user-Info", JSON.stringify(response.data.user));

      // Store the authentication token in localStorage.
      const token = response.data.token;
      localStorage.setItem("token", token);

      // Reset the form fields after successful registration.
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect the user to the dashboard.
      window.location.href = "/DashBoard";
    } catch (err) {
      // Log any errors to the console.
      console.log("Error Catch : ", err.message);
      enqueueSnackbar(
        // Show an error notification with the message from the server or a default message.
        err?.response?.data?.message ||
          "Registration failed. Please try again.",
        { variant: "error" }
      );
    }
  };

  return (
    // Use a React Fragment to group elements.
    <>
      {/* Main container for the registration form. */}
      <div className="form-containerAcc">
        {/* The form element with the submit handler. */}
        <form className="form" onSubmit={checkHandelsumbmit}>
          <h2>Create Account</h2>

          <div className="form-group">
            {/* Material-UI TextField for the username. */}
            <TextField
              label="UserName"
              type="text"
              variant="standard"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              fullWidth
            />
          </div>

          <div className="form-group">
            {/* TextField for the email. */}
            <TextField
              label="Email"
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
            {/* TextField for the password. */}
            <TextField
              label="Password"
              type="password"
              variant="standard"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              fullWidth
            />
          </div>

          <div className="form-group">
            <TextField
              label="Confirm-Password"
              type="password"
              variant="standard"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              fullWidth
            />
          </div>

          {/* The submit button for the form. */}
          <button type="submit" className="form-button">
            Register
          </button>

          {/* A paragraph with a link to the login page for users who already have an account. */}
          <p id="text">
            I Already Have An Account !.
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* The shared footer component. */}
      <div className="footer">
        <p>© 2025 My App — All Rights Reserved</p>
        <div className="socials">
          <h2>Developed By: Sylar</h2>
        </div>
      </div>
    </>
  );
}
