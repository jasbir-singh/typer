import React, { Component } from 'react';
import Text from './Text';
import Spinner from 'react-spinkit';

const TextWithSpinner = ({ loading }) => (
    <div>
    {
      loading ? <Spinner style={ { width:'50%', height: '10rem' } } name="ball-clip-rotate-multiple" /> : <Text />
    }
  </div>
);

export default TextWithSpinner;
