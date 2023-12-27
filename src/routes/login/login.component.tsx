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
import LoginForm from '../../components/login-form/login-form.component'

export default function Login() {
  return (
    <>
      <Center>
        <Heading size={'4xl'} marginBottom={10} fontWeight={'500'}>
          Catsta
        </Heading>
      </Center>

      <Stack spacing={3}>
        <LoginForm />

        <Box position='relative' paddingY='7'>
          <Divider />
          <AbsoluteCenter>OR</AbsoluteCenter>
        </Box>

        <GoogleLoginForm />
      </Stack>
      <Flex justifyContent={'center'} rounded={'md'} paddingY={5} gap={1}>
        <Text>Don't have an account?</Text>
        <Text color={'blue.500'} _hover={{ textDecoration: 'underline' }}>
          <Link to={'/auth/signup'}>Sign up</Link>
        </Text>
      </Flex>
    </>
  )
}
