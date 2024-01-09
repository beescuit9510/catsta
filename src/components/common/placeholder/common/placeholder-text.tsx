import { Text } from '@chakra-ui/react'
import React from 'react'

export default function PlaceholderText({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: chakra config
  return (
    <Text fontSize={'xl'} fontWeight={'700'}>
      {children}
    </Text>
  )
}
