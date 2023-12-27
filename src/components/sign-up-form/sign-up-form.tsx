import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'
import { GrHide } from 'react-icons/gr'
import { GrFormView } from 'react-icons/gr'
import { useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import { AuthErrorCodes } from 'firebase/auth'

const errorMessages: { [key: string]: string } = {
  [AuthErrorCodes.INVALID_EMAIL]: 'Given email is not valid',
  [AuthErrorCodes.EMAIL_EXISTS]: 'Given email is already in use',
  [AuthErrorCodes.INVALID_LOGIN_CREDENTIALS]:
    'Given email or password is wrong. Please try again',
}

export default function SignUpForm() {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth)

  const [show, setShow] = useState(false)

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')

  const [isInvalid, setIsInavlid] = useState(false)
  const [formErrorMsg, setFormErrorMsg] = useState('')

  const signUp = () => {
    if (email === '') {
      setIsInavlid(true)
      setFormErrorMsg('Email is required')
      return
    }
    if (username === '') {
      setIsInavlid(true)
      setFormErrorMsg('Username is required.')
      return
    }
    if (password === '') {
      setIsInavlid(true)
      setFormErrorMsg('Password is required')
      return
    }
    if (confirm === '') {
      setIsInavlid(true)
      setFormErrorMsg('Confirm your password')
      return
    }
    if (confirm !== password) {
      setIsInavlid(true)
      setFormErrorMsg('Those passwords must match')
      return
    }

    setIsInavlid(false)
    setFormErrorMsg('')
    createUserWithEmailAndPassword(email, password)
  }
  return (
    <>
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

      <FormControl isInvalid={isInvalid || error != undefined}>
        <FormErrorMessage>
          {isInvalid
            ? formErrorMsg
            : error
            ? errorMessages[error.code] || error.code
            : ''}
        </FormErrorMessage>
      </FormControl>

      <Button isLoading={loading} onClick={signUp}>
        Sign up
      </Button>
    </>
  )
}
