import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>{children}</Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
