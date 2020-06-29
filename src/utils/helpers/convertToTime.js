export default (number) => {
  const min = Math.floor(number / 60);
  const sec = (number % 60).toFixed();
  return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
};
