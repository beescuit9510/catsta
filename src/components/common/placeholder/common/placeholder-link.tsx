import { Button } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

export default function PlaceholderLink({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) {
  return (
    <Button variant={'link'} color={'twitter.500'}>
      <RouterLink to={to}>{children}</RouterLink>
    </Button>
  )
}
