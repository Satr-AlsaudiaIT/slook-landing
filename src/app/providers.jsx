'use client'

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { LangProvider } from '../context/LangContext'

// MUI dark theme aligned to Slook brand palette
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#7240ED' },
    secondary: { main: '#0065F7' },
    background: { default: '#07070D', paper: '#0F0F1A' },
    text: { primary: '#FFFFFF', secondary: 'rgba(255,255,255,0.7)' },
  },
  typography: {
    fontFamily:
      "var(--font-poppins), 'Poppins', 'IBM Plex Sans Arabic', system-ui, sans-serif",
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { paddingInline: 22, paddingBlock: 10 },
      },
    },
  },
})

export default function Providers({ children }) {
  return (
    <LangProvider defaultLang="ar">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </LangProvider>
  )
}
