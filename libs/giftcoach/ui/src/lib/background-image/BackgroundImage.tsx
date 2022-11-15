import { Box } from '@mui/material';
import React from 'react';
import Image from 'next/future/image';

export interface BackgroundImageProps {
  children?: React.ReactNode;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({
  children,
}) => {
  return (
    <div>
      <Box
        sx={{
          position: 'absolute',
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          zIndex: -1,
        }}
      >
        <Image
          alt="gift"
          src="https://images.pexels.com/photos/257855/pexels-photo-257855.jpeg"
          quality={100}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Box>{children}</Box>
    </div>
  );
};

export default BackgroundImage;
