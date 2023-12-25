import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  InputGroup,
  InputRightElement,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { GrHide } from 'react-icons/gr'
import { GrFormView } from 'react-icons/gr'
import { useState } from 'react'

export default function SignUp() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  const [password, setPassword] = useState('')
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false)
  const [pwErrorMsg, setPwErrorMsg] = useState('')

  const [confirm, setConfirm] = useState('')
  const [isConfirmInvalid, setIsConfirmInvalid] = useState(false)
  const [confirmErrorMsg, setConfirmErrorMsg] = useState('')

  const [email, setEmail] = useState('')
  const [isEmailInvalid, setIsEmailInvalid] = useState(false)
  const [emailErrorMsg, setEmailErrorMsg] = useState('')

  const [username, setUsername] = useState('')
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false)
  const [usernameErrorMsg, setUsernameErrorMsg] = useState('')

  const signUp = () => {
    if (email === '') {
      setIsEmailInvalid(true)
      setEmailErrorMsg('Email is required')
      return
    } else if (!email.includes('@')) {
      setIsEmailInvalid(true)
      setEmailErrorMsg('Given email address is invalid')
      return
    } else {
      setIsEmailInvalid(false)
      setEmailErrorMsg('')
    }

    if (username === '') {
      setIsUsernameInvalid(true)
      setUsernameErrorMsg('Username is required.')
      return
    } else {
      setIsUsernameInvalid(false)
      setUsernameErrorMsg('')
    }

    if (password === '') {
      setIsPasswordInvalid(true)
      setPwErrorMsg('Password is required')
      return
    } else if (password.length < 6) {
      setIsPasswordInvalid(true)
      setPwErrorMsg('Password must be at least 6 characters')
      return
    } else {
      setIsPasswordInvalid(false)
      setPwErrorMsg('')
    }

    if (confirm === '') {
      setIsConfirmInvalid(true)
      setConfirmErrorMsg('Confirm your password')
      return
    } else if (confirm !== password) {
      setIsConfirmInvalid(true)
      setConfirmErrorMsg('Those passwords must match')
      return
    } else {
      setIsConfirmInvalid(false)
      setConfirmErrorMsg('')
    }

    navigate('/')
  }
  return (
    <Center minH={'100vh'}>
      <Container maxWidth={'350'}>
        <Center>
          <Heading size={'4xl'} marginBottom={10} fontWeight={'500'}>
            Catsta
          </Heading>
        </Center>

        <Stack spacing={3}>
          <FormControl isInvalid={isEmailInvalid}>
            <Input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <FormErrorMessage>{emailErrorMsg}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={isUsernameInvalid}>
            <Input
              type='text'
              placeholder='Username'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <FormErrorMessage>{usernameErrorMsg}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={isPasswordInvalid}>
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
            <FormErrorMessage>{pwErrorMsg}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={isConfirmInvalid}>
            <Input
              type={`${show ? 'text' : 'password'}`}
              placeholder='Confirm Password'
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
            />
            <FormErrorMessage>{confirmErrorMsg}</FormErrorMessage>
          </FormControl>

          <Button onClick={signUp}>Sign up</Button>

          <Box position='relative' paddingY='10'>
            <Divider />
            <AbsoluteCenter>OR</AbsoluteCenter>
          </Box>

          <Button leftIcon={<FcGoogle />}>Log in with Google</Button>
        </Stack>
        <Flex justifyContent={'center'} rounded={'md'} paddingY={5} gap={1}>
          <Text>Already have an account?</Text>
          <Text color={'blue.500'} _hover={{ textDecoration: 'underline' }}>
            <Link to={'/login'}>Log in</Link>
          </Text>
        </Flex>
      </Container>
    </Center>
  )
}
