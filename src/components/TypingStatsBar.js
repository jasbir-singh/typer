import React, { Component } from 'react';
import Stat from './Stat';

const TypingStatsBar = ({ stats }) => {
  return (
    <div className="d-flex align-content-center mt-4 mb-4">
      {
        stats.map((props, i) => <Stat key={i} {...props} />)
      }
    </div>
  );
};

export default TypingStatsBar;
