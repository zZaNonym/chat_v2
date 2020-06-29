import tinycolor from 'tinycolor2';

const getCorectIndex = (number) => {
  return number > 255 ? 255 : number < 0 ? 0 : number;
};

const gradientGenerator = (hash) => {
  const [r, g, b] = hash
    .substr(0, 3)
    .split('')
    .map((char) => getCorectIndex(char.charCodeAt()));
  const color = tinycolor({ r, g, b });
  const colorLight = tinycolor({ r, g, b }).lighten(30);

  return { color1: color.toHexString(), color2: colorLight.toHexString() };
};

export default gradientGenerator;
