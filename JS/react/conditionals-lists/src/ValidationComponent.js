import React from 'react';

const ValidationComponent = ({len}) => {
  const out = getOutput(len)
  return (
    <div style={out.style}>{out.text}</div>
  );
};

const getOutput = (len) => {
  if (len < 5) {
   return {text: 'Text too short!', style: {backgroundColor: 'red'}};
  }
  if (len > 16) {
    return {text: 'Text too long!', style: {backgroundColor: 'red'}};
  }
  return {text: 'Text right size!', style: {backgroundColor: 'green'}};
};


export default ValidationComponent;
