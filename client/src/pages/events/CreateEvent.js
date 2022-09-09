import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const CreateEvent = () => {
  return (
    <>
      <h1 className='text-center'>Create Event</h1>
      <Table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>
              <NavLink to='/' className='button_round_active'>
                Step 1
              </NavLink>
            </th>
            <th>
              <Button className='button_round'>Step 2</Button>
            </th>
            <th>
              <Button className='button_round'>Step 3</Button>
            </th>
            <th>
              <Button className='button_round'>Step 4</Button>
            </th>
            <th>
              <Button className='button_round'>Step 5</Button>
            </th>
          </tr>
        </thead>
      </Table>
    </>
  );
};

export default CreateEvent;
