import React from 'react';
import styled from 'styled-components';

const SymbolGroup = styled.div`
  display: inline-block;
  input {
    display: none;
  }
  input:checked ~ label span::after {
    opacity: 1;
  }
  label {
    font-size: 10px;
    text-transform: uppercase;
    color: #617789;
    cursor: pointer;
    position: relative;
    padding-left: 2.5rem;
    span {
      height: 1.8rem;
      width: 1.8rem;
      border: 2px solid #bab8bd;
      border-radius: 50%;
      display: inline-block;
      position: absolute;
      /* background-color: #e9e9ea; */
      left: 0;
      top: -0.4rem;
      &::after {
        content: '';
        display: block;
        height: 1.1rem;
        width: 1.1rem;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.4rem;
        background-color: ${props => (props.color ? props.color : '')};
        opacity: 0;
        transition: opacity 0.5s;
      }
    }
  }
`;

const SymbolCheckBox = ({ name, label, checkValue, changed, color }) => {
  return (
    <SymbolGroup color={color}>
      <input
        type='checkbox'
        id={name}
        name={name}
        checked={checkValue}
        onChange={changed}
      />
      <label htmlFor={name}>
        <span />
        {label}
      </label>
    </SymbolGroup>
  );
};
export default SymbolCheckBox;
