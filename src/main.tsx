import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import type { GlobalStyleProps } from '@chakra-ui/theme-tools'
import { extendTheme } from '@chakra-ui/react'
import '@fontsource/rubik-scribble/400.css'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: `'Rubik Scribble', sans-serif`,
  },
  styles: {
    global: (props: GlobalStyleProps) => ({
      body: {
        bg: mode('gray.100', '#000')(props),
        color: mode('gray.800', 'whiteAlpha.900')(props),
      },
    }),
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
