import { Center, Flex, Heading, Text } from '@chakra-ui/react'
import '@fontsource/rubik-scribble/400.css'

export default function Error({
  errorMessage = 'Sorry, an unexpected error has occurred.',
}) {
  return (
    <Center>
      <Flex minHeight={'100vh'} direction={'column'} justifyContent={'center'}>
        <Heading fontFamily={'Rubik Scribble'}>Oops!</Heading>
        <Text>{errorMessage}</Text>
      </Flex>
    </Center>
  )
}
