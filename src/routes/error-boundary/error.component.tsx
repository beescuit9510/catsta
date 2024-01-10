import { Center, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import '@fontsource/rubik-scribble/400.css'
import React from 'react'
import GoLink from '../../components/common/go-link/go-link.component'

export default function Error({
  children = 'Sorry, an unexpected error has occurred in the app.',
}: {
  children?: React.ReactNode
}) {
  return (
    <Center>
      <Flex minHeight={'100vh'} direction={'column'} justifyContent={'center'}>
        <Stack spacing={2} alignItems={'flex-start'}>
          <Heading fontFamily={'Rubik Scribble'}>Oops!</Heading>
          <Text>{children}</Text>
          <GoLink to={'/'}>Go to the main page</GoLink>
        </Stack>
      </Flex>
    </Center>
  )
}
