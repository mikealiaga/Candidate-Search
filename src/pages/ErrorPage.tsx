import { Link } from "react-router-dom";
import "../styles/error.css"; // Ensure this file exists for styling

const ErrorPage = () => {
  return (
    <section className="error-page">
      <h1>404: Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <h2>¯\_(ツ)_/¯</h2>
      <Link to="/" className="home-button">Go Back Home</Link>
    </section>
  );
};

export default ErrorPage;