import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h4>Version 1.0.0</h4>
      <Link to="/" className="btn">
        Go back
      </Link>
    </div>
  );
};

export default About;
