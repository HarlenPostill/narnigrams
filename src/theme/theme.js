// src/theme/index.js
import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  colors: {
    primary: {
      500: '#3ECF8E',
    },
  },
});
