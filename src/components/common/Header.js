import React from "react";
import { Row, Col, Container } from "react-bootstrap";

export const Header = () => (
  <Container fluid>
    <Row className="header">
      <Col xs={3}>
        <h3><a href="#/" className="logo">LOGO</a></h3>
      </Col>
      <Col xs={9}>
        <div className="menu">
          <a href="#report">Report</a>
        </div>
      </Col>
    </Row>
  </Container>
);
