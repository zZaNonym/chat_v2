import React from 'react';

import { Button as BaseButton } from 'antd';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import './Button.scss';

export default function Button(props) {
  return (
    <BaseButton
      {...props}
      className={ClassNames('button', props.className, {
        'button--large': props.size === 'large',
      })}
    />
  );
}

Button.protTypes = {
  className: PropTypes.string,
};
