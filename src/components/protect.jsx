// Import shared styles.
import "../App.css";
// Import the Navigate component from react-router-dom for declarative redirection.
import { Navigate } from "react-router-dom";

// The Protect component is a higher-order component used to guard routes.
// It takes 'children' as a prop, which will be the component to render if the user is authenticated.
export default function Protect({ children }) {
  // Retrieve the authentication token from the browser's localStorage.
  const token = localStorage.getItem("token");

  // If no token is found, the user is not authenticated.
  if (!token) {
    // Redirect the user to the login page.
    return <Navigate to="/login" />;
  } else {
    // If a token exists, render the child components passed to this protector.
    return children;
  }
}
