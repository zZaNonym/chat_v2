import React from 'react';

import { gradientGenerator } from '../../utils/helpers';

import './Avatar.scss';

const Avatar = ({ avatar, fullname, _id }) => {
  if (avatar) {
    return <img className='avatar' src={avatar} alt={`avatar ${fullname}`} />;
  } else {
    const { color1, color2 } = gradientGenerator(_id.substr(0, 3));
    const firstChar = fullname[0].toUpperCase();
    return (
      <div
        style={{
          background: `linear-gradient(135deg,${color1} 0%,${color2} 96.52%)`,
        }}
        className='avatar avatar--symbol'>
        {firstChar}
      </div>
    );
  }
};

export default Avatar;
