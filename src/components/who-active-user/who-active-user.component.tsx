import { Avatar, Button, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function ActiveUser({
  userRef,
  displayName,
}: {
  userRef: string
  displayName: string
}) {
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'}>
      <Flex justifyContent={'space-between'} alignItems={'center'} gap={2}>
        <Avatar />
        <Flex>
          <Flex direction={'column'} alignItems={'flex-start'}>
            <Link to={`/profile/${userRef}`}>
              <Button variant={'link'}>{displayName}</Button>
            </Link>
            <Text fontSize={12}>Active 6h ago</Text>
          </Flex>
        </Flex>
      </Flex>
      <Button color={'twitter.700'} variant={'ghost'} size={'sm'}>
        Follow
      </Button>
    </Flex>
  )
}
