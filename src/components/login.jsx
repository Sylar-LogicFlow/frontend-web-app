// Import React hooks for state management.
import { useState } from "react";
// Import shared styles.
import "../App.css";
// Import Material-UI components for the user interface.
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent";
import { DialogContentText } from "@mui/material";
// Import Link for client-side routing.
import { Link } from "react-router-dom";
// Import axios for making API requests.
import axios from "axios";
// Import React for creating components and forwardRef.
import React from "react";
// Import useSnackbar for displaying notifications.
import { useSnackbar } from "notistack";

// A transition component for the Material-UI Dialog.
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// The Login component.
export default function Login() {
  // Hook to display snackbar notifications.
  const { enqueueSnackbar } = useSnackbar();

  // State for the login form data.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to control the "Forgot Password" dialog.
  const [openForgetPass, setOpenForgetPass] = useState(false);
  // State for the email input in the "Forgot Password" dialog.
  const [forgetPasswordEmail, setForgetPasswordEmail] = useState("");

  const HandleLoginSubmit = async (e) => {
    e.preventDefault();
    // Validate that both email and password are provided.
    if (!formData.email || !formData.password) {
      enqueueSnackbar("Please fill the fields", { variant: "warning" });
      return;
    }

    try {
      // Prepare the payload for the login request.
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      // Set the request headers.
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Send a POST request to the login endpoint.
      const response = await axios.post(
        "http://localhost:8000/api/login",
        payload,
        config
      );

      // Store the authentication token in localStorage.
      const token = response.data.token;
      localStorage.setItem("token", token);

      // Show a success message.
      enqueueSnackbar(response.data.message || "Login successful!", {
        variant: "success",
      });

      // Clear the form fields.
      setFormData({
        email: "",
        password: "",
      });

      // Redirect to the dashboard.
      window.location.href = "/DashBoard";
    } catch (err) {
      // Log and display any errors that occur during login.
      console.log("Error Catch : ", err);
      enqueueSnackbar(
        err?.response?.data?.message ||
          "Login failed. Please check your credentials.",
        { variant: "error" }
      );
    }
  };

  // Toggles the visibility of the "Forgot Password" dialog.
  const handleOpenForgetPassDialog = () => {
    setOpenForgetPass(!openForgetPass);
  };

  // Handles the submission of the "Forgot Password" form.
  const handleForgetPassSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the payload with the user's email.
      const payload = { email: forgetPasswordEmail };
      const config = { headers: { "Content-Type": "application/json" } };

      // Send a POST request to the forget-password endpoint.
      const response = await axios.post(
        "http://localhost:8000/api/forgot-password",
        payload,
        config
      );

      // Show a success message.
      enqueueSnackbar(response.data.message || "Password reset link sent!", {
        variant: "success",
      });

      // Clear the email field and close the dialog.
      setForgetPasswordEmail("");
      handleOpenForgetPassDialog();
    } catch (err) {
      // Log and display any errors.
      console.log("Error Catch : ", err);
      enqueueSnackbar(
        err?.response?.data?.message || "Failed to send reset link.",
        {
          variant: "error",
        }
      );
      // Clear the email field and close the dialog even on failure.
      setForgetPasswordEmail("");
      handleOpenForgetPassDialog();
    }
  };

  return (
    // Use a React Fragment to group multiple root elements.
    <>
      {/* "Forgot Password" Dialog */}
      <Dialog
        open={openForgetPass}
        TransitionComponent={Transition}
        onClose={handleOpenForgetPassDialog}
        PaperProps={{
          sx: {
            background: "linear-gradient(135deg, #2c3e50, #34495e)",
            color: "white",
            borderRadius: "15px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        {/* Dialog Title */}
        <DialogTitle
          sx={{ fontWeight: "bold", textAlign: "center", color: "#3498db" }}
        >
          Forgot Password
        </DialogTitle>
        {/* Form for submitting the forget password request. */}
        <form onSubmit={handleForgetPassSubmit}>
          <DialogContent sx={{ minWidth: 350 }}>
            <DialogContentText
              sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 2 }}
            >
              Enter your email address below and we'll send you a link to reset
              your password.
            </DialogContentText>
            {/* Email input field. */}
            <TextField
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={forgetPasswordEmail}
              onChange={(e) => setForgetPasswordEmail(e.target.value)}
              InputLabelProps={{ sx: { color: "rgba(255, 255, 255, 0.7)" } }}
              InputProps={{
                sx: {
                  color: "white",
                  "&:before": {
                    borderBottom: "1px solid rgba(255,255,255,0.5)",
                  },
                  "&:hover:not(.Mui-disabled):before": {
                    borderBottom: "1px solid #3498db",
                  },
                },
              }}
            />
          </DialogContent>
          {/* Dialog action buttons (Cancel and Send). */}
          <DialogActions sx={{ justifyContent: "center", pb: 2, px: 3 }}>
            <Button
              onClick={handleOpenForgetPassDialog}
              variant="outlined"
              sx={{
                borderRadius: "10px",
                px: 3,
                borderColor: "#e74c3c",
                color: "#e74c3c",
                "&:hover": {
                  borderColor: "#c0392b",
                  backgroundColor: "rgba(231, 76, 60, 0.1)",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: "10px",
                px: 3,
                background: "linear-gradient(135deg, #3498db, #2980b9)",
                "&:hover": {
                  background: "linear-gradient(135deg, #2980b9, #3498db)",
                },
              }}
            >
              Send Reset Password
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Login Form Container */}
      <div className="form-containerAcc">
        {/* The main login form. */}
        <form className="form" onSubmit={HandleLoginSubmit}>
          <h2>Login</h2>

          <div className="form-group">
            {/* Email input field. */}
            <TextField
              label="Email"
              variant="standard"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              fullWidth
            />
          </div>

          <div className="form-group">
            {/* Password input field. */}
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

          {/* Login submit button. */}
          <button type="submit" className="form-button">
            Login
          </button>

          {/* Link to the registration page. */}
          <p id="text">
            Don't Have An Account?{" "}
            <Link to="/Register" style={{ textDecoration: "none" }}>
              Register
            </Link>
          </p>

          {/* Clickable text to open the "Forgot Password" dialog. */}
          <p id="F-P" onClick={handleOpenForgetPassDialog}>
            I Forget Password ?
          </p>
        </form>
      </div>

      {/* Shared Footer */}
      <div className="footer">
        <p>© 2025 My App — All Rights Reserved</p>
        <div className="socials">
          <h2>Developed By: Sylar</h2>
        </div>
      </div>
    </>
  );
}
