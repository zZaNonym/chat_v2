export default (touched, errors) => {
  return touched ? (errors && touched ? 'error' : 'success') : null;
};
