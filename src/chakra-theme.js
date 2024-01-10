import { mode } from '@chakra-ui/theme-tools'
import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
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
    //GlobalStyleProps
    global: (props) => ({
      body: {
        bg: mode('whiteAlpha.900', '#000')(props),
        color: mode('gray.800', 'whiteAlpha.900')(props),
      },
    }),
  },
})
