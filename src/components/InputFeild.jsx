import React from 'react';

const InputField = ({ label,className , type, placeholder, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className={className}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;