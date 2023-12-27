import {
  AbsoluteCenter,
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import GoogleLoginForm from '../../components/google-login-form/google-login-form.component'
import SignUpForm from '../../components/sign-up-form/sign-up-form'

export default function SignUp() {
  return (
    <>
      <Center>
        <Heading size={'4xl'} marginBottom={10} fontWeight={'500'}>
          Catsta
        </Heading>
      </Center>

      <Stack spacing={3}>
        <SignUpForm />

        <Box position='relative' paddingY='10'>
          <Divider />
          <AbsoluteCenter>OR</AbsoluteCenter>
        </Box>

        <GoogleLoginForm />
      </Stack>
      <Flex justifyContent={'center'} rounded={'md'} paddingY={5} gap={1}>
        <Text>Already have an account?</Text>
        <Text color={'blue.500'} _hover={{ textDecoration: 'underline' }}>
          <Link to={'/auth'}>Log in</Link>
        </Text>
      </Flex>
    </>
  )
}
