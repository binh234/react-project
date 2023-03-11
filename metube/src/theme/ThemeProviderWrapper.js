import { createTheme, ThemeProvider } from '@mui/material';
import { useMemo, useState } from 'react';
import ColorModeContext from './ColorModeContext';

function ThemeProviderWrapper(props) {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: (mode) => {
        setMode(mode);
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            tb: 875,
            md: 1120,
            lg: 1500,
            xl: 1888,
            xxl: 2200,
          },
        }
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ThemeProviderWrapper;