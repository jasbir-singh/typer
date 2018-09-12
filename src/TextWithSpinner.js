import React from 'react';
import Text from './Text';
import {
  Wave
} from 'better-react-spinkit';

const TextWithSpinner = ({ loading }) => (
    <div>
    {
      loading ? <Wave size={150} /> : <Text />
    }
  </div>
);

export default TextWithSpinner;
