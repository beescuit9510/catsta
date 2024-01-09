import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react'
import { GrHide } from 'react-icons/gr'
import { GrFormView } from 'react-icons/gr'
import { useState } from 'react'
import { useLogin } from '../../../hooks/mutations/useLogin'
import AuthFormError from '../auth-error/auth-error.component'

export default function LoginForm() {
  const [show, setShow] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { mutate, isPending, isError, error } = useLogin({ email, password })
  const login = () => mutate()

  return (
    <>
      <Stack>
        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <InputGroup>
          <Input
            type={`${show ? 'text' : 'password'}`}
            placeholder='Password'
            onChange={(event) => setPassword(event.target.value)}
          />
          <InputRightElement
            textAlign={'center'}
            fontSize='1.2em'
            onClick={() => setShow((show) => !show)}
            cursor={'pointer'}
          >
            {show ? <GrFormView /> : <GrHide />}
          </InputRightElement>
        </InputGroup>
        <AuthFormError isError={isError} error={error} />
      </Stack>

      <Button isLoading={isPending} isDisabled={isPending} onClick={login}>
        Log in
      </Button>
    </>
  )
}
