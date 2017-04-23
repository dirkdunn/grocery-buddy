import React, {Component} from 'react';
import loader from '../images/spiral.svg';
import '../css/App.css';

const Loading = (props) => {
  return (
    <div style={{
      display: props.show ? 'block' : 'none'
    }} className="loading page">
      <img className="spinner" src={loader} alt="loading" />
    </div>
  )
};

export default Loading;
