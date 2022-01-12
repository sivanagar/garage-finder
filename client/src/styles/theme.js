import { extendTheme } from '@chakra-ui/react';
import { ButtonStyles as Button } from './components/ButtonStyles';

export const myTheme = extendTheme({
  colors: {
    backgroundlight: '#FFFFFF',
    primary: '#8F93D9',
    secondary: '#FF6F91',
    tertiary: '#A0A9D9',
    titlelight: '#303473',
    warning: '#FFC75F',
    success: '#4caf50',
    danger: '#f44336',

    primarydark: '#514EA6',
    secondarydark: '#303473',
    tertiarydark: '#5B5FA6',
    titledark: '#A0A9D9',
    warningdark: '#FFC75F',
    successdark: '#4caf50',
    dangerdark: '#f44336',
  },
  components: {
    Button,
  },
  breakpoints: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  },
});
