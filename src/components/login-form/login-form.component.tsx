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
import { auth } from '../../utils/firebase'
import { AuthErrorCodes } from 'firebase/auth'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'

const errorMessages: { [key: string]: string } = {
  [AuthErrorCodes.INVALID_EMAIL]: 'Given email is not valid',
  [AuthErrorCodes.EMAIL_EXISTS]: 'Given email is already in use',
  [AuthErrorCodes.INVALID_LOGIN_CREDENTIALS]:
    'Given email or password is wrong. Please try again',
}

export default function LoginForm() {
  const [show, setShow] = useState(false)

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)
  const [formErrorMsg, setFormErrorMsg] = useState('')
  console.log(error?.code)

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
    signInWithEmailAndPassword(email, password)
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
        <FormControl isInvalid={isInvalid || error !== undefined}>
          <FormErrorMessage>
            {isInvalid
              ? formErrorMsg
              : error
              ? errorMessages[error.code] || error.code
              : ''}
          </FormErrorMessage>
        </FormControl>
      </Stack>

      <Button isLoading={loading} onClick={login}>
        Log in
      </Button>
    </>
  )
}
