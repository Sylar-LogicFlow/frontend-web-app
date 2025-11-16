// Import Material-UI component for text fields.
import TextField from "@mui/material/TextField";
// Import React hook for state management.
import { useState } from "react";
// Import axios for making API requests.
import axios from "axios";
// Import hook from react-router-dom to access URL parameters.
import { useParams } from "react-router-dom";
// Import hook from notistack for displaying notifications.
import { useSnackbar } from "notistack";

// The component for handling the password reset functionality.
export default function ResetPassword() {
  // Hook to display snackbar notifications.
  const { enqueueSnackbar } = useSnackbar();

  // State to store the new password and its confirmation.
  const [password, setpassword] = useState({
    newpassword: "",
    confirmnewpassword: "",
  });

  // Get the password reset token from the URL parameters.
  const { token } = useParams();

  // Function to handle the form submission.
  const handlesubmit = async (e) => {
    // Prevent the default form submission behavior (page reload).
    e.preventDefault();

    // Check if the new password and confirmation password match.
    if (password.newpassword !== password.confirmnewpassword) {
      enqueueSnackbar("Password does not match", { variant: "error" });
      return;
    }

    try {
      // Prepare the payload with the new password data.
      const payload = {
        newpassword: password.newpassword,
        confirmnewpassword: password.confirmnewpassword,
      };
      // Set the request headers.
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Send a POST request to the reset password API endpoint with the token.
      const response = await axios.post(
        `http://localhost:8000/api/reset-password/${token}`,
        payload,
        config
      );

      // Show a success notification with the message from the server.
      enqueueSnackbar(
        response?.data?.message || "Successfully resset password",
        { variant: "success" }
      );

      // Clear the password fields after successful submission.
      setpassword({
        newpassword: "",
        confirmnewpassword: "",
      });

      window.location.href = "/login";
    } catch (err) {
      // Log any errors to the console.
      console.log("Catch Error : ", err);
      // Show an error notification with the message from the server.
      enqueueSnackbar(err?.response?.data?.message, {
        variant: "error",
      });
    }
  };

  return (
    <>
      {/* Main container for the reset password form. */}
      <div className="resetpass-container">
        <div className="form">
          <h2>Reset Password</h2>

          <form onSubmit={handlesubmit}>
            <div className="form-group">
              <TextField
                // Input for the new password.
                label="new password"
                variant="standard"
                type="password"
                value={password.newpassword}
                onChange={(e) => {
                  setpassword({
                    ...password,
                    newpassword: e.target.value,
                  });
                }}
                fullWidth
              />
            </div>

            <div className="form-group">
              <TextField
                // Input for confirming the new password.
                label="confirm new password"
                variant="standard"
                type="password"
                value={password.confirmnewpassword}
                onChange={(e) => {
                  setpassword({
                    ...password,
                    confirmnewpassword: e.target.value,
                  });
                }}
                fullWidth
              />
            </div>

            {/* Submit button for the form. */}
            <button type="submit" className="form-button">
              Submit
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
