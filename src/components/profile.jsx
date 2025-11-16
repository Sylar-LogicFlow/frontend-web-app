// Import shared styles and React library.
import "../App.css";
import React from "react";
// Import Material-UI components for UI elements and icons.
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import CallIcon from "@mui/icons-material/Call";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
// Import axios for API requests.
import axios from "axios";
import { useState, useEffect } from "react";
// Import more Material-UI components for dialogs and forms.
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
// Import notistack for displaying notifications.
import { useSnackbar } from "notistack";

// Import a local asset (avatar image).
import avater from "../assets/image22.png";

// Custom HomeIcon component.
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

// Transition component for Material-UI Dialogs.
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// The main Profile component.
export default function Profile() {
  // Hook to show snackbar notifications.
  const { enqueueSnackbar } = useSnackbar();

  // State to hold the current user's data.
  const [userData, setuserData] = useState({});

  // useEffect to fetch user data from localStorage when the component mounts.
  useEffect(() => {
    const userInfo = localStorage.getItem("user-Info");

    if (userInfo) {
      setuserData(JSON.parse(userInfo));
    }
  }, []); // Empty dependency array means this runs only once.

  // State for the change password form.
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  // State to control the visibility of the "Change Password" dialog.
  const [openChangePass, setOpenChangePass] = useState(false);

  // State to control the visibility of the "Delete Account" dialog.
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);

  // State for the password input in the "Delete Account" dialog.
  const [deleteaccpassword, setDeleteAccPassword] = useState("");

  // State for the edit profile form data.
  const [EditProfileData, setEditProfileData] = useState({
    name: "",
    email: "",
    bio: "",
  });

  // State to control the visibility of the "Edit Profile" dialog.
  const [OpenEditProfile, setOpenEditProfile] = useState(false);

  // Handles the submission of the "Change Password" form.
  const HandleChangepassword = async (e) => {
    e.preventDefault();
    try {
      // Prepare the payload for the API request.
      const payload = {
        oldpassword: formData.oldPassword,
        newpassword: formData.newPassword,
      };

      const token = localStorage.getItem("token");

      // Configure request headers with the auth token.
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Send a PUT request to the change password endpoint.
      const response = await axios.put(
        "http://localhost:8000/api/change-password",
        payload,
        config
      );

      enqueueSnackbar(response.data.message || "change password successful!", {
        variant: "success",
      });

      // Reset form and close the dialog on success.
      setFormData({
        oldPassword: "",
        newPassword: "",
      });
      setOpenChangePass(false);
    } catch (err) {
      console.log("Error Catch : ", err);
      // Show an error notification on failure.
      enqueueSnackbar(
        err?.response?.data?.message ||
          "change password failed. Please check your credentials",
        { variant: "error" }
      );
      setFormData({
        oldPassword: "",
        newPassword: "",
      });
      setOpenChangePass(false);
    }
  };

  // Toggles the "Change Password" dialog.
  const HandleOpenChangepassword = async () => {
    setOpenChangePass(!openChangePass);
  };

  // Handles user logout.
  const handleLogout = () => {
    // Remove the token from localStorage.
    localStorage.removeItem("token");
    // Redirect to the login page.
    window.location.href = "/login";
  };

  // Toggles the "Delete Account" dialog.
  const HandleOpenDeleteaccount = async () => {
    setOpenDeleteAccount(!openDeleteAccount);
  };

  // Handles the submission of the "Delete Account" form.
  const HandleDeleteAcc = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        password: deleteaccpassword,
      };

      const token = localStorage.getItem("token");

      // Configure request headers.
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Send a POST request to the delete account endpoint.
      const response = await axios.post(
        "http://localhost:8000/api/delete-account",
        payload,
        config
      );

      enqueueSnackbar(response.data.message || "Delete account successful!", {
        variant: "success",
      });

      // On success, close dialog, clear state, remove user data from localStorage, and redirect.
      setOpenDeleteAccount(false);
      setDeleteAccPassword("");
      localStorage.removeItem("token");
      localStorage.removeItem("user-Info");
      window.location.href = "/";
    } catch (err) {
      console.log("Catch Error", err);
      // Show an error notification on failure.
      enqueueSnackbar(err?.response?.data?.message || "Delete account failed", {
        variant: "error",
      });
      setOpenDeleteAccount(false);
      setDeleteAccPassword("");
    }
  };

  // Toggles the "Edit Profile" dialog.
  const HandleOpenEditProfile = () => {
    setOpenEditProfile(!OpenEditProfile);
  };

  // Handles the submission of the "Edit Profile" form.
  const HandleEditProfile = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: EditProfileData.name,
        email: EditProfileData.email,
        about: EditProfileData.bio,
      };
      const token = localStorage.getItem("token");

      // Configure request headers.
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Send a PUT request to the edit profile endpoint.
      const response = await axios.put(
        "http://localhost:8000/api/update-profile",
        payload,
        config
      );

      enqueueSnackbar(
        response.data.message || "Profile updated successfully!",
        { variant: "success" }
      );

      // Update user data in state and localStorage with the response.
      const updatedUserData = response.data.updatedUser;
      setuserData(updatedUserData);
      localStorage.setItem("user-Info", JSON.stringify(updatedUserData));

      // Reset form, close dialog, and reload the page to reflect changes.
      setEditProfileData({
        name: "",
        email: "",
        bio: "",
      });
      setOpenEditProfile(false);
      // Reloading the page ensures all components have the latest user data.
      window.location.reload();
    } catch (err) {
      console.log("Error Catch : ", err);
      enqueueSnackbar(
        err?.response?.data?.Errors?.[0]?.msg ||
          err?.response?.data?.message ||
          "Profile update failed.",
        { variant: "error" }
      );
      setEditProfileData({
        name: "",
        email: "",
        bio: "",
      });
      setOpenEditProfile(false);
    }
  };

  return (
    <>
      {/* "Change Password" Dialog */}
      <Dialog
        open={openChangePass}
        TransitionComponent={Transition}
        onClose={HandleOpenChangepassword}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            background: "linear-gradient(135deg, #2c3e50, #34495e)",
            color: "white",
            borderRadius: "15px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#3498db",
            mb: 1,
          }}
        >
          Change Password
        </DialogTitle>

        {/* Form for changing the password. */}
        <form onSubmit={HandleChangepassword}>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: 350,
              pb: 1,
            }}
          >
            <TextField
              // Input for the old password.
              label="Old Password"
              name="oldPassword"
              type="password"
              value={formData.oldPassword}
              onChange={(e) => {
                setFormData({ ...formData, oldPassword: e.target.value });
              }}
              variant="standard"
              required
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
              fullWidth
            />
            <TextField
              // Input for the new password.
              label="New Password"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={(e) => {
                setFormData({ ...formData, newPassword: e.target.value });
              }}
              variant="standard"
              required
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
              fullWidth
            />
          </DialogContent>

          {/* Dialog action buttons. */}
          <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
            <Button
              onClick={HandleOpenChangepassword}
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
              Change
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* End of "Change Password" Dialog */}

      {/* "Delete Account" Dialog */}
      <Dialog
        open={openDeleteAccount}
        TransitionComponent={Transition}
        onClose={HandleOpenDeleteaccount}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            background: "linear-gradient(135deg, #2c3e50, #34495e)",
            color: "white",
            borderRadius: "15px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{ fontWeight: "bold", textAlign: "center", color: "#e74c3c" }}
        >
          Delete Account
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This is a permanent action. To confirm, please enter your password.
            Once deleted, your account and all associated data cannot be
            recovered.
          </DialogContentText>
        </DialogContent>
        {/* Form for deleting the account. */}
        <form onSubmit={HandleDeleteAcc}>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: 350,
              pb: 1,
            }}
          >
            <TextField
              // Password confirmation input.
              label="Password"
              name="Password"
              type="Password"
              value={deleteaccpassword}
              onChange={(e) => setDeleteAccPassword(e.target.value)}
              variant="standard"
              required
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
              fullWidth
            />
          </DialogContent>
          {/* Dialog action buttons. */}
          <DialogActions sx={{ justifyContent: "center", pb: 2, px: 3 }}>
            <Button
              onClick={HandleOpenDeleteaccount}
              variant="outlined"
              sx={{
                borderRadius: "12px",
                px: 3,
                borderColor: "#3498db",
                color: "#3498db",
                "&:hover": {
                  borderColor: "#2980b9",
                  backgroundColor: "rgba(52, 152, 219, 0.1)",
                },
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="form-button danger-button">
              Delete
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* End of "Delete Account" Dialog */}

      {/* "Edit Profile" Dialog */}
      <Dialog
        open={OpenEditProfile}
        onClose={HandleOpenEditProfile}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            background: "linear-gradient(135deg, #2c3e50, #34495e)",
            color: "white",
            borderRadius: "15px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#3498db",
            mb: 1,
          }}
        >
          Edit Profile
        </DialogTitle>
        {/* Form for editing profile information. */}
        <form onSubmit={HandleEditProfile}>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: 350,
            }}
          >
            <TextField
              // Input for user's name.
              label="Name"
              name="name"
              value={EditProfileData.name}
              onChange={(e) => {
                setEditProfileData({
                  ...EditProfileData,
                  name: e.target.value,
                });
              }}
              variant="standard"
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
              fullWidth
            />
            <TextField
              // Input for user's email.
              label="Email"
              name="email"
              type="email"
              value={EditProfileData.email}
              onChange={(e) => {
                setEditProfileData({
                  ...EditProfileData,
                  email: e.target.value,
                });
              }}
              variant="standard"
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
              fullWidth
            />
            <TextField
              // Input for user's bio/about section.
              label="Bio"
              name="bio"
              value={EditProfileData.bio}
              onChange={(e) => {
                setEditProfileData({ ...EditProfileData, bio: e.target.value });
              }}
              variant="standard"
              multiline
              rows={3}
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
              fullWidth
            />
          </DialogContent>
          {/* Dialog action buttons. */}
          <DialogActions sx={{ justifyContent: "center", pb: 2, px: 3 }}>
            <Button
              onClick={HandleOpenEditProfile}
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
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* End of "Edit Profile" Dialog */}

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

            {/* Profile link (current page). */}
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
              <IconButton aria-label="Callicon">
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
              <IconButton aria-label="LogOutIcon">
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

        {/* Main content area for the profile page. */}
        <div className="profile-container">
          <div className="profile-card">
            {/* Profile header with avatar, name, and email. */}
            <div className="profile-header">
              <img src={avater} alt="User Avatar" className="profile-avatar" />
              <h2>{userData.name || "User Name"}</h2>
              <p>{userData.email || "UserName@gmail.com"}</p>
            </div>

            {/* Section displaying user's bio. */}
            <div className="profile-details">
              <h3>About Me</h3>
              <p>{userData.about || "this is my bio"}</p>
            </div>

            {/* Action buttons for profile management. */}
            <div className="profile-actions">
              <button
                // Button to open the "Change Password" dialog.
                className="form-button"
                onClick={HandleOpenChangepassword}
              >
                Change Password
              </button>
              <button className="form-button" onClick={HandleOpenEditProfile}>
                Edit Profile
              </button>
              <button
                // Button to log the user out.
                className="form-button danger-button"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                // Button to open the "Delete Account" dialog.
                className="form-button danger-button"
                onClick={HandleOpenDeleteaccount}
              >
                DeleteAccount
              </button>
            </div>
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
