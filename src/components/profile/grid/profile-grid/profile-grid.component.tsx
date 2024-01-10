import { Grid } from '@chakra-ui/react'
import React from 'react'

export default function ProfileGrid({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Grid templateColumns='repeat(3, 1fr)' gap={3}>
      {children}
    </Grid>
  )
}
