import React from 'react';
import { PulseLoader } from 'react-spinners';

const Button = ({ type, text, onClick, className, disabled, loading }) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <PulseLoader color="#fff" size={8} margin={4} />
      ) : (
        text
      )}
    </button>
  );
};

export default Button;