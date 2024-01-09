import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ButtonProps, ChakraProvider } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import type { GlobalStyleProps } from '@chakra-ui/theme-tools'
import { extendTheme } from '@chakra-ui/react'
import '@fontsource/dancing-script/600.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        'go-link': (props: ButtonProps) => ({
          ...theme.components.Button.variants.link(props),
          color: 'twitter.500',
          _hover: {
            color: 'twitter.700',
          },
        }),

        post: (props: ButtonProps) => ({
          ...theme.components.Button.variants.link(props),
          color: 'twitter.500',
          _hover: {
            color: 'twitter.700',
          },
        }),

        'inverted-post': () => ({
          color: 'white',
          bg: 'twitter.500',
          _hover: {
            bg: 'twitter.600',
          },
        }),
      },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: `'Dancing Script', sans-serif`,
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

export const queryClient = new QueryClient({
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
