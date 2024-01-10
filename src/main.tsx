import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import type { GlobalStyleProps } from '@chakra-ui/theme-tools'
import { extendTheme } from '@chakra-ui/react'
import '@fontsource/dancing-script/600.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const theme = extendTheme({
  components: {
    Text: {
      variants: {
        placeholder: () => ({
          fontSize: 'xl',
          fontWeight: '700',
        }),
      },
    },
    Button: {
      variants: {
        'profile-link': (props) => ({
          ...theme.components.Button.variants.link(props),
          display: 'flex',
          fontWeight: '400',
          color: props.colorMode === 'light' ? 'black' : 'whiteAlpha.900',
        }),

        'go-link': (props) => ({
          ...theme.components.Button.variants.link(props),
          color: 'twitter.500',
          _hover: {
            color: 'twitter.700',
          },
        }),
        'go-link-light': (props) => ({
          ...theme.components.Button.variants.link(props),
          color: 'twitter.500',
          _hover: {
            color: 'twitter.700',
          },
          fontWeight: '500',
        }),

        post: (props) => ({
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
