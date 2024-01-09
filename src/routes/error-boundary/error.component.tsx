import { Button, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import '@fontsource/rubik-scribble/400.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Error({
  children = 'Sorry, an unexpected error has occurred.',
}: {
  children?: React.ReactNode
}) {
  return (
    <Center>
      <Flex minHeight={'100vh'} direction={'column'} justifyContent={'center'}>
        <Stack spacing={2} alignItems={'flex-start'}>
          <Heading fontFamily={'Rubik Scribble'}>Oops!</Heading>
          <Text>{children}</Text>
          <Button
            to={'/'}
            variant={'link'}
            fontWeight={'400'}
            color={'twitter.500'}
            as={Link}
          >
            Go to the main page
          </Button>
        </Stack>
      </Flex>
    </Center>
  )
}
