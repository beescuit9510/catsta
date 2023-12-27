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
import useLoginWithEmailAndPassword from '../../hooks/useLoginWithEmailAndPassword'

export default function LoginForm() {
  const [show, setShow] = useState(false)

  const { signIn, loading, error, errorMessage } =
    useLoginWithEmailAndPassword()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)
  const [formErrorMsg, setFormErrorMsg] = useState('')

  const login = () => {
    if (email === '') {
      setIsInvalid(true)
      setFormErrorMsg('Email is required')
      return
    }
    if (password === '') {
      setIsInvalid(true)
      setFormErrorMsg('Password is required')
      return
    }

    setIsInvalid(false)
    setFormErrorMsg('')
    signIn(email, password)
  }

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
        <FormControl isInvalid={isInvalid || error}>
          <FormErrorMessage>{formErrorMsg || errorMessage}</FormErrorMessage>
        </FormControl>
      </Stack>

      <Button isLoading={loading} onClick={login}>
        Log in
      </Button>
    </>
  )
}
