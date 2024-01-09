import { Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function PlaceholderLink({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) {
  return (
    <Button variant={'go-link'} as={Link} to={to}>
      {children}
    </Button>
  )
}
