import { Center, Flex, Heading, Text } from '@chakra-ui/react'

export default function Error({
  errorMessage = 'Sorry, an unexpected error has occurred.',
}) {
  return (
    <Center>
      <Flex minHeight={'100vh'} direction={'column'} justifyContent={'center'}>
        <Heading>Oops!</Heading>
        <Text>{errorMessage}</Text>
      </Flex>
    </Center>
  )
}
