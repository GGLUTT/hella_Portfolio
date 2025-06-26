import React from 'react';
import ScrollVelocity from './ScrollVelocity';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <ScrollVelocity
        texts={['Hella Developer']}
        velocity={50}
        className="footer-text"
        parallaxClassName="footer-parallax"
        scrollerClassName="footer-scroller"
      />
    </footer>
  );
};

export default Footer;