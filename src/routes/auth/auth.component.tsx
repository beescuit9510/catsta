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
  Link,
  InputGroup,
  InputRightElement,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import { GrHide } from 'react-icons/gr'
import { GrFormView } from 'react-icons/gr'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Auth() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
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

  const login = () => {
    navigate('/')
  }

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

          {!isLogin && (
            <FormControl isInvalid={isUsernameInvalid}>
              <Input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <FormErrorMessage>{usernameErrorMsg}</FormErrorMessage>
            </FormControl>
          )}

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
                _hover={{ cursor: 'pointer' }}
              >
                {show ? <GrFormView /> : <GrHide />}
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{pwErrorMsg}</FormErrorMessage>
          </FormControl>

          {!isLogin && (
            <FormControl isInvalid={isConfirmInvalid}>
              <Input
                type={`${show ? 'text' : 'password'}`}
                placeholder='Confirm Password'
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
              />
              <FormErrorMessage>{confirmErrorMsg}</FormErrorMessage>
            </FormControl>
          )}

          <Button onClick={isLogin ? login : signUp}>
            {isLogin ? 'Log in' : 'Sign Up'}
          </Button>

          <Box position='relative' paddingY='10'>
            <Divider />
            <AbsoluteCenter>OR</AbsoluteCenter>
          </Box>

          <Button leftIcon={<FcGoogle />}>Log in with Google</Button>
        </Stack>
        <Flex justifyContent={'center'} rounded={'md'} paddingY={5} gap={1}>
          <Text>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </Text>
          <Link
            color={'blue.500'}
            onClick={() => {
              setIsLogin((prev) => !prev)
              setIsEmailInvalid(false)
              setEmailErrorMsg('')
              setIsUsernameInvalid(false)
              setUsernameErrorMsg('')
              setIsPasswordInvalid(false)
              setPwErrorMsg('')
              setIsConfirmInvalid(false)
              setConfirmErrorMsg('')
            }}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </Link>
        </Flex>
      </Container>
    </Center>
  )
}
