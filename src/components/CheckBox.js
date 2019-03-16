import React from 'react';
import './CheckBox.css';
const CheckBox = ({ name, label, checkValue, changed }) => {
  return (
    <div className='form__checkbox-group'>
      <input
        type='checkbox'
        className='form__checkbox-input'
        id={name}
        name={name}
        checked={checkValue}
        onChange={changed}
      />
      <label htmlFor={name} className='form__checkbox-label'>
        <span className='form__checkbox-button' />
        {label}
      </label>
    </div>
  );
};
export default CheckBox;
