import { Text as ChakraText } from '@chakra-ui/react'
import React from 'react'

export default function PlaceholderText({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ChakraText fontSize={'xl'} fontWeight={'700'}>
      {children}
    </ChakraText>
  )
}
