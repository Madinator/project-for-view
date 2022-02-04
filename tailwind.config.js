const spacings = {
  px: '1px',
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  13: '3.25rem',
  14: '3.5rem',
  15: '3.75rem',
  16: '4rem',
  18: '4.5rem',
  20: '5rem',
  23: '5.75rem',
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
  '1/8': '12.5%',
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

const blockSize = {
    xsw: 'var(--w-block-xs)',
    xsh: 'var(--h-block-xs)',
    mdw: 'var(--w-block-base)',
    mdh: 'var(--h-block-base)',
    lgw: 'var(--w-block-lg)',
    lgh: 'var(--h-block-lg)',
    checkbox: 'var(--checkbox-base)'  
}

const fontSizes = {
  lg: 'var(--font-size-xl)',
  bgr: 'var(--font-size-lg)',
  md: 'var(--font-size-md)',
  reg: 'var(--font-size-reg)',
  sm: 'var(--font-size-sm)',
};

const colors = {
  transparent: 'var(--color-transparent)',
  black:  {
    default: '#000000',
  },
  white: {
    default: '#ffffff',
  },
  primary: {
    default: 'var(--color-primary-dark)',
    gray: 'var(--color-primary-gray)',
  },
  modal: 'var(--color-modal)',
  placeholder: 'var(--color-placeholder)',
  warning: 'var(--color-warning)',
  checkbox: 'var(--color-checkbox)',
};

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {},
    colors: colors,
    textColors: colors,
    backgroundColors: colors,
    width: (theme) => ({
      auto: 'auto',
      ...spacings,
      fit: 'fit-content',
      full: '100%',
      screen: '100vw',
      ...blockSize,
    }),
    height: (theme) => ({
      auto: 'auto',
      full: '100%',
      screen: '100vh',
      ...spacings,
      ...blockSize,
    }),
    borderRadius: {
      none: '0',
      sm: '.125rem',
      default: '0.188rem',
      lg: '.75rem',
      full: '9999px',
      ...spacings,
    },
    fontSize: {
      xl: fontSizes.lg, // 32px
      lg: fontSizes.bgr, // 24px
      md: fontSizes.md, //20px
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
    backgroundImage: {
      'checkMark': "url('./src/assets/icons/checkMark.svg')"
    },
    spacing: (theme) => ({
      ...spacings,
    }),
  },
  variants: {},
  plugins: [],
}



