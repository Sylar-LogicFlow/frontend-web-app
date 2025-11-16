// Import the Link component for navigation and the shared stylesheet.
import { Link } from "react-router-dom";
import "../App.css";

// The NotFoundPage component is displayed when a user navigates to a route that doesn't exist.
export default function NotFoundPage() {
  return (
    <>
      {/* Main container for the 404 content, centering it on the page. */}
      <div className="NotFound-container" style={{ textAlign: "center" }}>
        {/* A styled box to hold the 404 message. */}
        <div className="form">
          <h1 style={{ fontSize: "6rem", color: "#b94a48", margin: 0 }}>404</h1>
          <h2 style={{ marginTop: 0 }}>Page Not Found</h2>
          <p>Sorry, the page you are looking for does not exist.</p>
          {/* A link styled as a button to navigate the user back to the home page. */}
          <Link
            to="/"
            className="form-button"
            style={{
              textDecoration: "none",
              display: "inline-block",
              marginTop: "20px",
            }}
          >
            Go to Home Page
          </Link>
        </div>
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
