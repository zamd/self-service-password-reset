import React, { Component, PropTypes } from 'react';

const Loading = ({ show, children }) => {
  if (!show) {
    return children || <div></div>;
  }
  return (
    <div className="spinner spinner-md is-auth0">
      <div className="circle"></div>
    </div>
  );
};

Loading.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node,
};

export default Loading;