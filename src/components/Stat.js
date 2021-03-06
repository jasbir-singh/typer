import React from 'react';

const Stat = ({ stat, text }) => (
  <div className="border-bottom flex-fill text-center">
    <span style={{ fontSize: '3rem' }}>{stat}</span>
    {text}
  </div>
);

export default Stat;
