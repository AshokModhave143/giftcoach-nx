import theme from './theme';

const { fontWeightLight, fontWeightMedium, fontWeightBold, fontWeightRegular } =
  theme.typography;

const fontWeights = [
  fontWeightLight,
  fontWeightMedium,
  fontWeightRegular,
  fontWeightBold,
];
const fontFamily = theme.typography.fontFamily
  .split(',')[0]
  .trim()
  .replace(/"/g, '');

export const fontHref = `https://fonts.googleapis.com/css?family=${fontFamily}:${fontWeights.join(
  ','
)}&display=swap`;
