import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import logo from '../assets/images/layout/TMH_Logo_100x100.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ADD_USER, LOGIN_USER } from '../utils/mutations';
import jwt from 'jwt-decode';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
//import { useEffect } from 'react';

const MainNav = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [login, { error }] = useMutation(LOGIN_USER);
  const [addUser, { regError }] = useMutation(ADD_USER);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = await login({
        variables: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        },
      });
      const token = user.data.login.token;
      Auth.login(token);
      window.location.href = '/profile';
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: email, password: password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
      window.location.href = '/profile';
    } catch (e) {
      console.log(e);
    }
  };

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (token) {
    const user = jwt(token);
  }
  const { loading, data } = useQuery(GET_ME);
  const me = data?.me || {};
  console.log(me);

  const handleLogout = () => {
    Auth.logout();
    navigate('/');
  };
  return (
    <>
      <Navbar expand='md' id='main-nav'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            <img src={logo} alt='TMH Logo' />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls='basic-navbar-nav'
            className='custom-toggler'
          />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ps-4'>
              <Nav.Item>
                <Nav.Link as={NavLink} to='/'>
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to='/events'>
                  Events
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to='/features'>
                  Features
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to='/clubs'>
                  Clubs
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to='/pricing'>
                  Pricing
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to='/about'>
                  Aboout
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to='/contact'>
                  Contact
                </Nav.Link>
              </Nav.Item>

              {token ? (
                <>
                  <Nav.Item>
                    <Nav.Link as={NavLink} to='/profile'>
                      {me.firstName}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  </Nav.Item>
                </>
              ) : (
                <Nav.Item>
                  <Nav.Link onClick={handleShow}>Signup/Login</Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal size='lg' show={show} onHide={handleClose} className='modal'>
        <Modal.Header className='modal-content-head' closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={5}>
              <Row>
                <Col className='modal-content-subHead'>Login</Col>
              </Row>
              <Row>
                <Col className='modal-content'>
                  <Form onSubmit={handleLogin}>
                    <Form.Group as={Row} className='mb-3'>
                      <Col md={2} className='p-2'>
                        <Form.Label>
                          <img
                            src='../assets/images/layout/login/icon_reg_email.gif'
                            alt='email icon'
                          />
                        </Form.Label>
                      </Col>
                      <Col md={10} className='text-right p-2'>
                        <Form.Control
                          type='email'
                          id='email'
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder='Email address'
                          className='shadow rounded'
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mb-3'>
                      <Col md={2} className='p-2'>
                        <Form.Label>
                          <img
                            src='../assets/images/layout/login/icon_reg_locked.gif'
                            alt='locked icon'
                          />
                        </Form.Label>
                      </Col>
                      <Col md={10} className='text-right p-2'>
                        <Form.Control
                          type='password'
                          id='password'
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder='Email address'
                          className='shadow rounded'
                        />
                      </Col>
                    </Form.Group>

                    <Button type='submit'>Login</Button>
                  </Form>
                </Col>
              </Row>
            </Col>
            <Col md={1}>
              <img
                src='../assets/images/layout/login/login_divider.gif'
                alt='divider'
              />
            </Col>
            <Col sm={12} md={5}>
              <Row>
                <Col className='modal-content-subHead'>Sign Up</Col>
              </Row>
              <Row>
                <Col className='modal-content'>
                  <Form onSubmit={handleRegister}>
                    <Form.Group as={Row} className='mb-3'>
                      <Col md={2} className='p-2'>
                        <Form.Label>
                          <img
                            src='../assets/images/layout/login/icon_reg_name_37_33.gif'
                            alt='reg name'
                          />
                        </Form.Label>
                      </Col>
                      <Col md={10} className='text-right p-2'>
                        <Form.Control
                          type='text'
                          id='firstName'
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder='First Name'
                          className='shadow rounded'
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mb-3'>
                      <Col md={2} className='p-2'>
                        <Form.Label>
                          <img
                            src='../assets/images/layout/login/icon_reg_name_37_33.gif'
                            alt='reg name icon'
                          />
                        </Form.Label>
                      </Col>
                      <Col md={10} className='text-right p-2'>
                        <Form.Control
                          type='text'
                          id='lastName'
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder='Last Name'
                          className='shadow rounded'
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mb-3'>
                      <Col md={2} className='p-2'>
                        <Form.Label>
                          <img
                            src='../assets/images/layout/login/icon_reg_email.gif'
                            alt='email icon'
                          />
                        </Form.Label>
                      </Col>
                      <Col md={10} className='text-right p-2'>
                        <Form.Control
                          type='email'
                          id='email'
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder='Email address'
                          className='shadow rounded'
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mb-3'>
                      <Col md={2} className='p-2'>
                        <Form.Label>
                          <img
                            src='../assets/images/layout/login/icon_reg_locked.gif'
                            alt='locked icon'
                          />
                        </Form.Label>
                      </Col>
                      <Col md={10} className='text-right p-2'>
                        <Form.Control
                          type='password'
                          id='password'
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder='Email address'
                          className='shadow rounded'
                        />
                      </Col>
                    </Form.Group>

                    <Button type='submit'>Login</Button>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MainNav;
