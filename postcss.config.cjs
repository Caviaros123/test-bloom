module.exports = {
    plugins: {
      'postcss-preset-mantine': {
        theme: {
            primaryColor: '#1e7366',
            secondaryColor: '#f2f2f2',
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