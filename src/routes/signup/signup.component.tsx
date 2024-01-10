import { Flex, Stack, Text } from '@chakra-ui/react'
import GoogleLoginForm from '../../components/auth/google-login-form/google-login-form.component'
import SignUpForm from '../../components/auth/sign-up-form/sign-up-form'
import AuthFormDivider from '../../components/auth/auth-form-divider/auth-form-divider.component'
import Logo from '../../components/common/logo/logo.component'
import GoLink from '../../components/common/go-link/go-link.component'

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
        <GoLink variant={'light'} to={'/auth'}>
          Log in
        </GoLink>
      </Flex>
    </>
  )
}
