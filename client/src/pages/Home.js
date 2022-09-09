import React from 'react';
import Options from '../components/home/Options';
import Events from '../components/home/Events';
import Features from '../components/home/Featues';

const Home = () => {
  return (
    <>
      <section id='mouseOver' className='my-4'>
        <Options />
      </section>

      <section id='homeEvents'>
        <Events />
      </section>

      <section id='features' className='my-4'>
        <Features />
      </section>
    </>
  );
};

export default Home;
