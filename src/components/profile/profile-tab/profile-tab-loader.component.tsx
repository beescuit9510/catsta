import { Grid, Skeleton, Stack } from '@chakra-ui/react'

export default function ProfileTabLoader() {
  return (
    <Stack spacing={10}>
      <Grid templateColumns='repeat(3, 1fr)' gap={3}>
        {Array(6)
          .fill(1)
          .map((v, idx) => (
            <Skeleton key={v + idx} height={{ base: '7rem', md: '250px' }} />
          ))}
      </Grid>
    </Stack>
  )
}
