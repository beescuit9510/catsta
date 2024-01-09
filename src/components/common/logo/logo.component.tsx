import { Center, Heading, HeadingProps } from '@chakra-ui/react'

export default function Logo({ ...rest }: HeadingProps) {
  return (
    <Center>
      <Heading size={'4xl'} marginBottom={10} fontWeight={'500'} {...rest}>
        Catstagram
      </Heading>
    </Center>
  )
}
