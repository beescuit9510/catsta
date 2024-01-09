import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import GoogleLoginForm from '../../components/auth/google-login-form/google-login-form.component'
import SignUpForm from '../../components/auth/sign-up-form/sign-up-form'
import AuthFormDivider from '../../components/auth/auth-form-divider/auth-form-divider.component'
import Logo from '../../components/common/logo/logo.component'

export default function SignUp() {
  return (
    <>
      <Logo />

      <Stack spacing={3}>
        <SignUpForm />

        <AuthFormDivider />

        <GoogleLoginForm />
      </Stack>

      <Flex justifyContent={'center'} rounded={'md'} paddingY={5} gap={1}>
        <Text>Already have an account?</Text>
        <Button variant={'go-link-light'} as={Link} to={'/auth'}>
          Log in
        </Button>
      </Flex>
    </>
  )
}
