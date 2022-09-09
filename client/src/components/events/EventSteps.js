import React from 'react';
import { Col, Nav, Row, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const EventSteps = ({ step1, step2, step3, step4, step5, step6 }) => {
  return (
    <Nav className='mb-4'>
      <Table borderless>
        <thead>
          <tr>
            <th className='text-center'>
              <Nav.Item>
                {step1 ? (
                  <Nav.Link disabled className='button_round_active'>
                    Step 1
                  </Nav.Link>
                ) : (
                  <LinkContainer to='/events/createEvent/basic'>
                    <Nav.Link className='button_round'>Step 1</Nav.Link>
                  </LinkContainer>
                )}
              </Nav.Item>
            </th>
            <th className='text-center'>
              <Nav.Item>
                {step2 ? (
                  <Nav.Link disabled className='button_round'>
                    Step 2
                  </Nav.Link>
                ) : (
                  <LinkContainer to='/event/createEvent/whenWhere'>
                    <Nav.Link className='button_round'>Step 2</Nav.Link>
                  </LinkContainer>
                )}
              </Nav.Item>
            </th>
            <th className='text-center'>
              <Nav.Item>
                {step2 ? (
                  <Nav.Link disabled className='button_round'>
                    Step 2
                  </Nav.Link>
                ) : (
                  <LinkContainer to='/event/createEvent/whenWhere'>
                    <Nav.Link className='button_round'>Step 2</Nav.Link>
                  </LinkContainer>
                )}
              </Nav.Item>
            </th>
            <th>
              <Nav.Item>
                {step2 ? (
                  <Nav.Link disabled className='button_round'>
                    Step 2
                  </Nav.Link>
                ) : (
                  <LinkContainer to='/event/createEvent/whenWhere'>
                    <Nav.Link className='button_round'>Step 2</Nav.Link>
                  </LinkContainer>
                )}
              </Nav.Item>
            </th>
            <th>
              <Nav.Item>
                {step2 ? (
                  <Nav.Link disabled className='button_round'>
                    Step 2
                  </Nav.Link>
                ) : (
                  <LinkContainer to='/event/createEvent/whenWhere'>
                    <Nav.Link className='button_round'>Step 2</Nav.Link>
                  </LinkContainer>
                )}
              </Nav.Item>
            </th>
            <th>
              <Nav.Item>
                {step2 ? (
                  <Nav.Link disabled className='button_round'>
                    Step 2
                  </Nav.Link>
                ) : (
                  <LinkContainer to='/event/createEvent/logistics'>
                    <Nav.Link className='button_round'>Step 2</Nav.Link>
                  </LinkContainer>
                )}
              </Nav.Item>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='step_text text-center'>Basic Info</td>
            <td className='step_text'>When/Where</td>
            <td className='step_text'>Divisions</td>
            <td className='step_text'>Logo</td>
            <td className='step_text'>Athlete Info</td>
          </tr>
        </tbody>
      </Table>
    </Nav>
  );
};

export default EventSteps;
