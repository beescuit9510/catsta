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
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword'

export default function SignUpForm() {
  const { signUp, loading, error, errorMessage } =
    useSignUpWithEmailAndPassword()

  const [show, setShow] = useState(false)

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')

  const [isInvalid, setIsInavlid] = useState(false)
  const [formErrorMsg, setFormErrorMsg] = useState('')

  const onClickSignUp = () => {
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
    signUp(email, password, username)
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

      <FormControl isInvalid={isInvalid || error}>
        <FormErrorMessage>{formErrorMsg || errorMessage}</FormErrorMessage>
      </FormControl>

      <Button isLoading={loading} onClick={onClickSignUp}>
        Sign up
      </Button>
    </>
  )
}
