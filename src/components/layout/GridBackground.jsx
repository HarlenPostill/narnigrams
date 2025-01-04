// src/components/layout/GridBackground.jsx
import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const GridBackground = ({ children }) => {
  return (
    <Box
      position="relative"
      minH="100vh"
      bgColor="white"
      _dark={{ bgColor: 'gray.900' }}
      overflow="hidden">
      {/* Base Grid with Dots */}
      <Box
        position="absolute"
        top="-50%"
        right="-50%"
        bottom="-50%"
        left="-50%"
        backgroundImage={`
          radial-gradient(circle at center, rgba(0, 0, 0, 0.1) 2px, transparent 2px)
        `}
        backgroundSize="40px 40px"
        backgroundPosition="center center"
        _dark={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 2px, transparent 2px)
          `,
        }}
      />
      {/* Edge Fade Overlays */}
      <Box
        position="absolute"
        inset="0"
        backgroundImage={`
          linear-gradient(to right, white, transparent 10%, transparent 90%, white),
          linear-gradient(to bottom, white, transparent 10%, transparent 90%, white)
        `}
        _dark={{
          backgroundImage: `
            linear-gradient(to right, #171923, transparent 10%, transparent 90%, #171923),
            linear-gradient(to bottom, #171923, transparent 10%, transparent 90%, #171923)
          `,
        }}
      />

      {/* Content */}
      <Box position="relative" zIndex="1">
        {children}
      </Box>
    </Box>
  );
};

GridBackground.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GridBackground;
