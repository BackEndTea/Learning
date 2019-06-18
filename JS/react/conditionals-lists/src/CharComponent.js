import React from 'react';

const CharComponent = ({char, id, onClickHandler}) => {
  return (
    <div onClick={onClickHandler}>{char} -> {id}</div>
  )
};

export default CharComponent;
