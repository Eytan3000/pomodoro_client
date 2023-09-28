import { extendTheme } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  // No custom tokens found, you can skip the theme augmentation.
}

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          '100': '#feeeeeff',
          '200': '#ffbcbeff',
          '300': '#ff9a9dff',
          '400': '#ff787cff',
          '500': '#ff575cff',
          '600': '#ff344dff',
          '700': '#ff1220ff',
          '800': '#ff0013ff',
          '900': '#ff0000ff',
          solidBg: 'var(--joy-palette-primary-500)',
          solidColor: 'var(--joy-palette-neutral-50)',
          solidHoverBg: '#ff344dff',
          solidActiveBg: 'var(--joy-palette-primary-500)',
        },
        neutral: {
          '50': '#ffffffff',
        },
        success: {
          '400': '#22c467ff',
        },
      },
    },
    dark: {
      palette: {},
    },
  },
});
export default theme;
