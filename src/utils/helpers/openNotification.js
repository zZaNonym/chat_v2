import { notification } from 'antd';

export default ({ type = 'info', title, text, duration = 2 }) =>
  notification[type]({
    message: title,
    description: text,
    duration: duration,
  });
