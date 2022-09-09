import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import iconBook from '../../assets/images/layout/home/icon_book_60_51.jpg';
import iconClock from '../../assets/images/layout/home/icon_clock_60_51.jpg';
import iconPencil from '../../assets/images/layout/home/icon_pencil_60_51.jpg';
import iconGlobe from '../../assets/images/layout/home/icon_globe_60_51.jpg';
import iconCalendar from '../../assets/images/layout/home/icon_calendar_60_51.jpg';
import iconTrack from '../../assets/images/layout/home/icon_track_60_51.jpg';
const Features = () => {
  return (
    <>
      <Row>
        <Col md={4} className='d-flex align-items-stretch'>
          <Card>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <img src={iconBook} alt='Book Icon' />
                </Col>
                <Col md={9}>
                  <Card.Title>Create a Profile</Card.Title>
                  <Card.Text>
                    Your profile will contain all of the information that you
                    need for simple, on-line registration for a tournament.
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className='d-flex align-items-stretch'>
          <Card>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <img src={iconClock} alt='Clock Icon' />
                </Col>
                <Col md={9}>
                  <Card.Title>Search Upcoming Events</Card.Title>
                  <Card.Text>
                    Easily search and discover upcoming tournaments, camps, and
                    clinics.
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className='d-flex align-items-stretch'>
          <Card>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <img src={iconPencil} alt='Pencil Icon' />
                </Col>
                <Col md={9}>
                  <Card.Title>Register</Card.Title>
                  <Card.Text>
                    Easily register and pay for your tournament online.
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={4} className='d-flex align-items-stretch'>
          <Card>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <img src={iconGlobe} alt='Globe Icon' />
                </Col>
                <Col md={9}>
                  <Card.Title>Share</Card.Title>
                  <Card.Text>
                    Let your friends and teammates know when you have signed up
                    and find out which of your teammates are competing.
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className='d-flex align-items-stretch'>
          <Card>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <img src={iconCalendar} alt='Calendar Icon' />
                </Col>
                <Col md={9}>
                  <Card.Title>Stay Up-to-Date</Card.Title>
                  <Card.Text>
                    Stay informed and get all of the latest information on
                    tournaments for which you've registered.
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className='d-flex align-items-stretch'>
          <Card>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <img src={iconTrack} alt='Track Icon' />
                </Col>
                <Col md={9}>
                  <Card.Title>Track Your Results</Card.Title>
                  <Card.Text>
                    Keep a record of all your tournament brackets and results in
                    one place.
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Features;
