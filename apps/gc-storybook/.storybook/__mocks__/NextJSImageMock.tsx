import React, { ImgHTMLAttributes } from 'react';

const NextImageMock: React.FC<ImgHTMLAttributes<never>> = (props) => (
  // eslint-disable-next-line jsx-a11y/alt-text
  <img {...props} />
);

export default NextImageMock;
