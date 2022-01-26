const spacings = {
  px: '1px',
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  18: '4.5rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66.666667%',
  '5/6': '83.333333%',
  '1/12': '8.333333%',
  '2/12': '16.666667%',
  '3/12': '25%',
  '4/12': '33.333333%',
  '5/12': '41.666667%',
  '6/12': '50%',
  '7/12': '58.333333%',
  '8/12': '66.666667%',
  '9/12': '75%',
  '10/12': '83.333333%',
  '11/12': '91.666667%',
};

const fontSizes = {
  lg: 'var(--font-size-lg)',
  md: 'var(--font-size-md)',
  reg: 'var(--font-size-reg)',
  sm: 'var(--font-size-sm)',
};

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    width: (theme) => ({
      auto: 'auto',
      ...spacings,
      fit: 'fit-content',
      full: '100%',
      screen: '100vw',
    }),
    height: (theme) => ({
      auto: 'auto',
      full: '100%',
      screen: '100vh',
      ...spacings,
    }),
    borderRadius: {
      none: '0',
      sm: '.125rem',
      default: '0.188rem',
      lg: '.5rem',
      full: '9999px',
    },
    fontSize: {
      lg: fontSizes.lg, // 32px
      md: fontSizes.md, // 24px
      base: fontSizes.reg, // 15px
      xs: fontSizes.sm, // 13px
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  variants: {},
  plugins: [],
}


