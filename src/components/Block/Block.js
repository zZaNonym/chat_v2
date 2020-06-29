import React from 'react';

import ClassNames from 'classnames';

import './Block.scss';

const Block = ({ children, className }) => (
  <div className={ClassNames('block', className)}>{children}</div>
);

export default Block;
