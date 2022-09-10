import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

const customBasicField = ({ name }) => {
  return (
    <Row>
      <Form.Group className='mb-3'>
        <Col>
          <Row>
            <Col sm={12} md={2}>
              <Form.Label className='form-label'>Custom Field</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <input type='text' name={name} />
            </Col>
          </Row>
        </Col>
      </Form.Group>
    </Row>
  );
};

export default customBasicField;
