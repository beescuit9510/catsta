import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import type { GlobalStyleProps } from '@chakra-ui/theme-tools'
import { extendTheme } from '@chakra-ui/react'
import '@fontsource/rubik-scribble/400.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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
        bg: mode('whiteAlpha.900', '#000')(props),
        color: mode('gray.800', 'whiteAlpha.900')(props),
      },
    }),
  },
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <App />
        <ReactQueryDevtools />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
