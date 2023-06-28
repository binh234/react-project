import { DarkTheme as DefaultDarkTheme, LightTheme as DefaultLightTheme } from '@refinedev/mui'

import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const LightTheme = createTheme({
  ...DefaultLightTheme,
})

const DarkTheme = createTheme({
  ...DefaultDarkTheme,
})

const DarkThemeWithResponsiveFontSizes = responsiveFontSizes(DarkTheme)
const LightThemeWithResponsiveFontSizes = responsiveFontSizes(LightTheme)

export { LightThemeWithResponsiveFontSizes, DarkThemeWithResponsiveFontSizes }
