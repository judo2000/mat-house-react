import React from 'react';
import { Nav, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const EventSteps = ({ id, step1, step2, step3, step4, step5, step6 }) => {
  // const search = useLocation().search;
  // const eid = new URLSearchParams(search).get('eId');
  console.log(id);
  return (
    <Nav className='mb-4'>
      <Table borderless>
        <thead>
          <tr>
            <th className='text-center'>
              <Nav.Item>
                {step1 ? (
                  <LinkContainer to={`/events/createEvent/editbasic?eId=${id}`}>
                    <Nav.Link className='button_round_active'>Step 1</Nav.Link>
                  </LinkContainer>
                ) : (
                  <Nav.Link className='button_round'>Step 1</Nav.Link>
                )}
              </Nav.Item>
            </th>
            <th className='text-center'>
              <Nav.Item>
                {step2 ? (
                  <LinkContainer to={`/events/createEvent/logistics?dId=${id}`}>
                    <Nav.Link className='button_round_active'>Step 2</Nav.Link>
                  </LinkContainer>
                ) : (
                  <Nav.Link className='button_round'>Step 2</Nav.Link>
                )}
              </Nav.Item>
            </th>
            <th className='text-center'>
              <Nav.Item>
                {step3 ? (
                  <Nav.Link className='button_round_active'>Step 3</Nav.Link>
                ) : (
                  <LinkContainer to={`/events/createEvent/divisions?eId=${id}`}>
                    <Nav.Link className='button_round'>Step 3</Nav.Link>
                  </LinkContainer>
                )}
              </Nav.Item>
            </th>
            <th>
              <Nav.Item>
                {step4 ? (
                  <Nav.Link className='button_round_active'>Step 4</Nav.Link>
                ) : (
                  <LinkContainer to='/event/createEvent/whenWhere'>
                    <Nav.Link className='button_round'>Step 4</Nav.Link>
                  </LinkContainer>
                )}
              </Nav.Item>
            </th>
            <th>
              <Nav.Item>
                {step5 ? (
                  <Nav.Link className='button_round_active'>Step 5</Nav.Link>
                ) : (
                  <LinkContainer to='/event/createEvent/whenWhere'>
                    <Nav.Link className='button_round'>Step 5</Nav.Link>
                  </LinkContainer>
                )}
              </Nav.Item>
            </th>
            <th>
              <Nav.Item>
                {step6 ? (
                  <Nav.Link className='button_round_active'>Step 6</Nav.Link>
                ) : (
                  <LinkContainer to='/events/createEvent/logistics'>
                    <Nav.Link className='button_round'>Step 6</Nav.Link>
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
