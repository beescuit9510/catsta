import {
  Center,
  Container,
  Grid,
  Skeleton,
  SkeletonCircle,
  Stack,
} from '@chakra-ui/react'

export default function ProfileSkeleton() {
  // FIXME: fix the height in a smaller screen

  return (
    <Center marginTop={20}>
      <Container maxW='container.lg'>
        <Stack spacing={10}>
          <SkeletonCircle size={'10rem'} />
          <Grid templateColumns='repeat(3, 1fr)' gap={3}>
            <Skeleton height='250px' />
            <Skeleton height='250px' />
            <Skeleton height='250px' />
            <Skeleton height='250px' />
            <Skeleton height='250px' />
            <Skeleton height='250px' />
          </Grid>
        </Stack>
      </Container>
    </Center>
  )
}
