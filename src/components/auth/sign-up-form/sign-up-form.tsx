import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormErrorMessage,
  Stack,
} from '@chakra-ui/react'
import { GrHide } from 'react-icons/gr'
import { GrFormView } from 'react-icons/gr'
import { useState } from 'react'
import useCreateUser from '../../../hooks/mutations/useCreateUser'

export default function SignUpForm() {
  const [show, setShow] = useState(false)

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')

  const { mutate, isError, isPending, error } = useCreateUser()

  const signUp = () => mutate({ email, username, password, confirm })

  return (
    <>
      <Stack>
        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
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

        <Input
          type={`${show ? 'text' : 'password'}`}
          placeholder='Confirm Password'
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
        />

        <FormControl isInvalid={isError}>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      </Stack>

      <Button isLoading={isPending} isDisabled={isPending} onClick={signUp}>
        Sign up
      </Button>
    </>
  )
}
