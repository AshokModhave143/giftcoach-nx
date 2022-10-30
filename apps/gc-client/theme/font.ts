import theme from './theme';

const { fontWeightLight, fontWeightMedium, fontWeightBold, fontWeightRegular } =
  theme.typography;

const fontWeights = [
  fontWeightLight,
  fontWeightMedium,
  fontWeightRegular,
  fontWeightBold,
];

export const fontHref = `https://fonts.googleapis.com/css?family=${
  theme.typography.fontFamily
}:${fontWeights.join(',')}&display=swap`;
