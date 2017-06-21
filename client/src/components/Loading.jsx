import React, { Component, PropTypes } from 'react';

const Loading = ({ show, children, size }) => {
  if (!show) {
    return children || <div></div>;
  }

  return (
    <div className={`spinner spinner-${size} ${ size === 'md' || size === 'lg' ? 'is-auth' : '' }`}>
      <div className="circle"></div>
    </div>
  );
};

// Specifies the default values for props:
Loading.defaultProps = {
  size: 'md'
};

Loading.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg'])
};

export default Loading;