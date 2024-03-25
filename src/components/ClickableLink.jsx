import React from 'react';

const ClickableLink = ({ link, text }) => {
  const handleClick = () => {
    window.open(link, '_blank');
  };

  return (
    <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={handleClick}>
      {text}
    </span>
  );
};

export default ClickableLink;
