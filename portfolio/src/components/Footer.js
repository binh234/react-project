import { Container, Col, Row } from "react-bootstrap";
import logo from "../assets/img/logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col sm={6}>
            <img src={logo} alt="logo" />
          </Col>
          <Col sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://github.com/binh234">
                <img src={navIcon1} alt="nav1" />
              </a>
              <a href="https://linkedin.com/in/binh234">
                <img src={navIcon2} alt="nav2" />
              </a>
              <a href="https://www.facebook.com/binh.le234">
                <img src={navIcon3} alt="nav3" />
              </a>
            </div>
            <p>Copyright &copy; 2023. All right reserves</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
