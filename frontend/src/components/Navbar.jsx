import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav>
      <Link to="/">Dashboard</Link> |{" "}
      <Link to="/students">Students</Link> |{" "}
      <Link to="/companies">Companies</Link> |{" "}
      <Link to="/internships">Internships</Link> |{" "}
      <Link to="/applications">Applications</Link> |{" "}
      <Link to="/certificates">Certificates</Link> |{" "}
      <Link to="/skills">Skills</Link> |{" "}
    </nav>
  );
}
export default Navbar;