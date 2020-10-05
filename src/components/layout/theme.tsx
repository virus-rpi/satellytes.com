import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  palette: {
    primary: {
      main: '#668CFF',
    },
    text: {
      default: '#202840',
      defaultLight: '#FFFFFF',
      defaultDark: '#FFFFFF',
      header: '#668CFF',
      headerLight: '#FFFFFF',
      link: {
        default: '#668CFF',
        hover: '#4D79FF',
      },
      contrastLink: {
        default: '#4D79FF',
        hover: '#FFFFFF',
        hoverTransparent: 'rgba(77,121,255, 0.2)',
      },
    },
    background: {
      body: '#202840',
      bodyLight: '#FFFFFF',
      card: '#F5F6F7',
      footer: '#4D79FF',
    },
  },
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px',
  },
  typography: {
    fontFamily: 'CocoGothic',
    fontSize: '16px',
  },
  maxWidth: '1280px',
};
