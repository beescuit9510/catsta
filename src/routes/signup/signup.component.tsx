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
import { Link } from 'react-router-dom'
import { GrHide } from 'react-icons/gr'
import { GrFormView } from 'react-icons/gr'
import { useState } from 'react'

export default function SignUp() {
  const [show, setShow] = useState(false)

  const [password, setPassword] = useState('')
  const [isPasswordIvalid, setIsPasswordInvalid] = useState(false)
  const [pwErrorMsg, setPwErrorMsg] = useState('')

  const [email, setEmail] = useState('')
  const [isEmailIvalid, setIsEmailInvalid] = useState(false)
  const [emailErrorMsg, setEmailErrorMsg] = useState('')

  const [username, setUsername] = useState('')
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false)
  const [usernameErrorMsg, setUsernameErrorMsg] = useState('')

  const signUp = () => {
    if (email === '') {
      setIsEmailInvalid(true)
      setEmailErrorMsg('Email is required')
    } else if (!email.includes('@')) {
      setIsEmailInvalid(true)
      setEmailErrorMsg('Given email address is invalid')
    } else {
      setIsEmailInvalid(false)
      setEmailErrorMsg('')
    }

    if (password === '') {
      setIsPasswordInvalid(true)
      setPwErrorMsg('Password is required')
    } else if (password.length < 6) {
      setIsPasswordInvalid(true)
      setPwErrorMsg('Password must be at least 6 characters')
    } else {
      setIsPasswordInvalid(false)
      setPwErrorMsg('')
    }

    if (username === '') {
      setIsUsernameInvalid(true)
      setUsernameErrorMsg('Username is required.')
    } else {
      setIsUsernameInvalid(false)
      setUsernameErrorMsg('')
    }
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
          <FormControl isInvalid={isEmailIvalid}>
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

          <FormControl isInvalid={isPasswordIvalid}>
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
          <Button onClick={signUp}>Log in</Button>

          <Box position='relative' paddingY='10'>
            <Divider />
            <AbsoluteCenter>OR</AbsoluteCenter>
          </Box>

          <Button leftIcon={<FcGoogle />}>Log in with Google</Button>
        </Stack>
        <Flex justifyContent={'center'} rounded={'md'} paddingY={5} gap={1}>
          <Text>Don't have an account?</Text>
          <Text color={'blue.500'} _hover={{ textDecoration: 'underline' }}>
            <Link to={'/login'}>Sign up</Link>
          </Text>
        </Flex>
      </Container>
    </Center>
  )
}
