import { Flex, Stack, Text } from '@chakra-ui/react'
import GoogleLoginForm from '../../components/auth/google-login-form/google-login-form.component'
import LoginForm from '../../components/auth/login-form/login-form.component'
import Logo from '../../components/common/logo/logo.component'
import AuthFormDivider from '../../components/auth/auth-form-divider/auth-form-divider.component'
import GoLink from '../../components/common/go-link/go-link.component'

export default function Login() {
  return (
    <>
      <Logo />

      <Stack spacing={3}>
        <LoginForm />

        <AuthFormDivider />

        <GoogleLoginForm />
      </Stack>

      <Flex justifyContent={'center'} rounded={'md'} paddingY={5} gap={1}>
        <Text>Don't have an account?</Text>
        <GoLink variant={'light'} to={'/auth/signup'}>
          Sign up
        </GoLink>
      </Flex>
    </>
  )
}
