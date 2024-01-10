import { Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Variants = {
  default: 'go-link',
  light: 'go-link-light',
} as const

export default function GoLink({
  to,
  children,
  variant = 'default',
}: {
  to: string
  children: React.ReactNode
  variant?: 'default' | 'light'
}) {
  return (
    <Button variant={Variants[variant]} as={Link} to={to}>
      {children}
    </Button>
  )
}
