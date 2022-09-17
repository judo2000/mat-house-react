import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import Footer from './components/Footer';
import Clubs from './pages/Clubs';
import IndividualClub from './pages/IndividualClub';
import CreateClub from './pages/CreateClub';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Events from './pages/events/Events';
import IndividualEvent from './pages/events/IndividualEvent';
import BasicInfo from './pages/events/createEvent/BasicInfo';
import Logistics from './pages/events/createEvent/Logistics';
import Divisions from './pages/events/createEvent/Divisions';

//Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});
// const client = new ApolloClient({
//   uri: 'http://localhost:3001/graphql',
//   cache: new InMemoryCache(),
// });

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Container>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/clubs' element={<Clubs />} />
            <Route path='/clubs/:slug' element={<IndividualClub />} />
            <Route path='/clubs/create' element={<CreateClub />} />
            <Route path='/events' element={<Events />} />
            <Route path='/events/:slug' element={<IndividualEvent />} />
            <Route path='/events/createEvent/basic' element={<BasicInfo />} />
            <Route
              path='/events/createEvent/logistics'
              element={<Logistics />}
            />
            <Route
              path='/events/createEvent/divisions'
              element={<Divisions />}
            />
          </Routes>
          <Footer />
        </Router>
      </Container>
    </ApolloProvider>
  );
}

export default App;
