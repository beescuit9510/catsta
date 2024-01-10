import { Center, Container } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

export default function Auth() {
  return (
    <Center minH={'100vh'}>
      <Container maxWidth={'350'}>
        <Outlet />
      </Container>
    </Center>
  )
}
