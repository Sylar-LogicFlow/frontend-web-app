// Import the shared stylesheet for the application.
import "../App.css";

// The Home component, which serves as the landing page of the application.
export default function Home() {
  // Array of technologies used in the project.
  const items = ["React", "Vite", "Node.js", "Express", "MongoDB", "JWT"];
  // Array of key features of the application.
  const items2 = [
    "User Auth",
    "Responsive Design",
    "Interactive Forms",
    "Secure API",
    "Fast Loading",
    "24/7 Support",
  ];
  // Array of additional benefits or qualities of the application.
  const items3 = [
    "Modern UI/UX",
    "Scalable",
    "Data Encryption",
    "Easy Integration",
    "Cross-browser",
    "Developer Friendly",
  ];

  return (
    // Using a React Fragment to group multiple elements without adding an extra node to the DOM.
    <>
      {/* Hero section container */}
      <div className="container">
        {/* Welcome message section */}
        <div style={{ width: "50%" }}>
          <h1>Welcome to My App</h1>
          <p>Manage Your Account And Explore Amazing Features.</p>
        </div>

        <hr id="hr" />

        {/* Features section with a placeholder for an image */}
        <div style={{ width: "50%" }}>
          <h1>Features</h1>
          <h1>here is image</h1>
        </div>
      </div>

      {/* A section with placeholder "Lorem Ipsum" text */}
      <div className="Context">
        <div className="Content-Footer">
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            omnis eligendi doloribus, aspernatur et facere sunt illum soluta
            quasi? Quod unde commodi fugiat quia! Pariatur doloribus quos quae
            quisquam eos?
          </h1>
        </div>
      </div>

      {/* "Why Choose Us?" heading section */}
      <div className="TextCard">
        <h1>Why Choose Us?</h1>
      </div>

      {/* A grid of cards highlighting key selling points */}
      <div className="cards">
        <div className="card">
          <div>
            <h3>Secure & Reliable</h3>
            <p>Your data is protected with top-tier security features.</p>
          </div>
        </div>
        <div className="card">
          <div>
            <h3>Fully Responsive</h3>
            <p>Access your account on any device, anywhere.</p>
          </div>
        </div>
        <div className="card">
          <div>
            <h3>Easy to Use</h3>
            <p>A clean, modern interface designed for you.</p>
          </div>
        </div>
        <div className="card">
          <div>
            <h3>24/7 Support</h3>
            <p>
              Get help whenever you need it with our dedicated support team.
            </p>
          </div>
        </div>
        <div className="card">
          <div>
            <h3>Fast Performance</h3>
            <p>
              Enjoy a blazing-fast and optimized experience on our platform.
            </p>
          </div>
        </div>
      </div>

      {/* A scrolling banner section to display technology items */}
      <div className="ItemSection">
        <div className="ForItems">
          <div className="items">
            {/* Map over the 'items' array twice to create a continuous scrolling effect */}
            {[...items, ...items].map((item, index) => (
              <h1 id="item-text" key={index}>
                {item}
              </h1>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal */}
      <hr
        style={{
          border: "1px solid #3498db",
          marginBottom: "14px",
        }}
      />

      {/* Another set of scrolling banners for features and benefits */}
      <div className="ForItems2">
        <div className="Items2">
          {/* Map over the 'items2' array twice for a continuous scroll */}
          {[...items2, ...items2].map((item, index) => (
            <h1 id="item-text" key={index}>
              {item}
            </h1>
          ))}
        </div>

        <div className="Items3">
          {/* Map over the 'items3' array twice for a continuous scroll */}
          {[...items3, ...items3].map((item, index) => (
            <h1 id="item-text" key={index}>
              {item}
            </h1>
          ))}
        </div>
      </div>

      {/* Another horizontal rule with custom styling */}
      <hr
        style={{
          border: "1px solid #3498db",
          marginTop: "40px",
        }}
      />

      {/* The footer section of the page */}
      <div className="footer">
        <p>© 2025 My App — All Rights Reserved</p>
        <div className="socials">
          <h2>Developed By: Sylar</h2>
        </div>
      </div>
    </>
  );
}
