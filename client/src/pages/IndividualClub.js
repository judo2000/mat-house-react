import React from 'react';
import jwt from 'jwt-decode';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { GET_CLUB } from '../utils/queries';
import Loader from '../components/Loader';
import { Button, Col, Row } from 'react-bootstrap';
import ClubButton from '../components/club/ClubButton';
import ClubHome from '../components/club/ClubHome';
import ClubContact from '../components/club/ClubContact';
import ClubSchedule from '../components/club/ClubSchedule';
import ClubInstructors from '../components/club/ClubInstructors';
import ClubAbout from '../components/club/ClubAbout';
import ClubMessages from '../components/club/ClubMessages';
import EditClub from '../components/club/EditClub';
import { JOIN_CLUB } from '../utils/mutations';

const IndividualClub = () => {
  const { slug } = useParams();
  const search = useLocation().search;

  let cat = new URLSearchParams(search).get('cat');
  if (!cat) {
    cat = 'home';
  }
  const { data, loading } = useQuery(GET_CLUB, {
    variables: { slug: slug },
  });
  const club = data?.club || {};
  // console.log(club);
  let member_type = '';
  let token = '';
  let user = '';
  if (!loading) {
    token = Auth.loggedIn() ? Auth.getToken() : null;
    if (token) {
      user = jwt(token);
      const members = club.clubMembers;
      const isMember = members.some((member) => {
        if (member._id === user.data._id) {
          return (member_type = 'Member');
        }
        return '';
      });
      if (member_type !== 'Member') {
        const admins = club.clubAdmins;
        const isAdmin = admins.some((admin) => {
          if (admin._id === user.data._id) {
            return (member_type = 'Admin');
          }
          return '';
        });
      }
    }
  }

  const [joinClub] = useMutation(JOIN_CLUB);

  // const handleJoinClub = async () => {
  //   console.log('club id :', club._id);
  //   console.log('user id :', user.data._id);
  // };

  return loading ? (
    <Loader />
  ) : (
    <div className='club_styles'>
      <Row>
        <Col sm={12} md={2} className='pe-1'>
          <Row>
            <Col className='text-center pt-2'>Club Logo coming soon</Col>
          </Row>
        </Col>
        <Col sm={12} md={10} className='ps-1'>
          <div className='profile_name'>{club.clubName}</div>
          <div className='member'>
            <Row>
              <Col md={5}>
                {member_type !== '' ? (
                  <h3>Club {member_type}</h3>
                ) : (
                  <h3>
                    {token ? (
                      <Button
                        className='btn'
                        onClick={() =>
                          joinClub(
                            {
                              variables: {
                                clubId: club._id,
                              },
                            },
                            (window.location = `/clubs/${club.slug}`)
                          )
                        }
                      >
                        Join Club
                      </Button>
                    ) : (
                      <h3>Login to join club</h3>
                    )}
                  </h3>
                )}
              </Col>
            </Row>
          </div>
          <div id='profile_box'>
            <Row className='d-none d-md-flex'>
              <Col md={4} className='text-center'>
                Phone
              </Col>
              <Col md={4} className='text-center'>
                Email
              </Col>
              <Col md={4} className='text-center'>
                Location
              </Col>
            </Row>
            <Row>
              <Col md={4} className='text-center'>
                {club.phone}
              </Col>
              <Col md={4} className='text-center'>
                {club.clubEmail}
              </Col>
              <Col md={4} className='text-center'>
                {`${club.city}, ${club.state} ${club.country}`}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* Main Body */}
      <Row className='pt-4 '>
        <Col sm={12} md={2} className='text-center pe-sm-2 pe-md-1'>
          <NavLink to='?cat=home'>
            <ClubButton
              btnClass={`btn ${cat === 'home' ? 'active' : ''}`}
              text='Home'
            />
          </NavLink>
          <NavLink to='?cat=contact'>
            <ClubButton
              btnClass={`btn ${cat === 'contact' ? 'active' : ''}`}
              text='Contact'
            />
          </NavLink>
          <NavLink to='?cat=schedule'>
            <ClubButton
              btnClass={`btn ${cat === 'schedule' ? 'active' : ''}`}
              text='Schedule'
            />
          </NavLink>
          <NavLink to='?cat=instructors'>
            <ClubButton
              btnClass={`btn ${cat === 'instructors' ? 'active' : ''}`}
              text='Instructors'
            />
          </NavLink>
          <NavLink to='?cat=about'>
            <ClubButton
              btnClass={`btn ${cat === 'about' ? 'active' : ''}`}
              text='About'
            />
          </NavLink>
          <NavLink to='?cat=messages'>
            <ClubButton
              btnClass={`btn ${cat === 'messages' ? 'active' : ''}`}
              text='Messages'
            />
          </NavLink>
          {member_type === 'Admin' && (
            <>
              <NavLink to='?cat=edit'>
                <ClubButton
                  btnClass={`btn ${cat === 'edit' ? 'active' : ''}`}
                  text='Edit Club'
                />
              </NavLink>
              <NavLink
                to={`/events/createEvent/basic?cID=${club._id}&uID=${user.data._id}`}
              >
                <ClubButton btnClass='btn' text='Create Event' />
              </NavLink>
            </>
          )}
        </Col>
        <Col sm={12} md={10} className='ps-1 pb-4'>
          <div className='profile_main'>
            {cat === 'home' && <ClubHome text={club.homeInfo} />}
            {cat === 'contact' && <ClubContact text={club.contact} />}
            {cat === 'schedule' && <ClubSchedule text={club.classSchedule} />}
            {cat === 'instructors' && (
              <ClubInstructors text={club.headInstructor} />
            )}
            {cat === 'about' && <ClubAbout text={club.about} />}
            {cat === 'messages' && <ClubMessages />}
            {cat === 'edit' && <EditClub />}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default IndividualClub;
