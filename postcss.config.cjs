module.exports = {
    plugins: {
      'postcss-preset-mantine': {
        theme: {
            primaryColor: '#FF4785',
            fontFamily: 'Arial, sans-serif',
        },
      },
      'postcss-simple-vars': {
        variables: {
          'mantine-breakpoint-xs': '36em',
          'mantine-breakpoint-sm': '48em',
          'mantine-breakpoint-md': '62em',
          'mantine-breakpoint-lg': '75em',
          'mantine-breakpoint-xl': '88em',
        },
      }
    },
  };