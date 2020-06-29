import React, { Fragment } from 'react';

import { formatDistanceToNow, parseISO } from 'date-fns';

const Time = ({ date }) => {
  return <Fragment>{formatDistanceToNow(parseISO(date))}</Fragment>;
};

export default Time;
