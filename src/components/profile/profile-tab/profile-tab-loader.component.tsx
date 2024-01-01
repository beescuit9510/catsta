import { Grid, Skeleton, Stack } from '@chakra-ui/react'

// FIXME: the media query styling to be replaced with Show/Hide componenet.

export default function ProfileTabLoader() {
  return (
    <Stack spacing={10}>
      <Grid templateColumns='repeat(3, 1fr)' gap={3}>
        {Array(11)
          .fill(1)
          .map((v, idx) => (
            <Skeleton key={v + idx} height={{ base: '7rem', md: '250px' }} />
          ))}
      </Grid>
    </Stack>
  )
}
