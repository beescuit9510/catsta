import { Avatar, Button, Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function MostRecentlyActiveUser({
  userRef,
  displayName,
}: {
  userRef: string
  displayName: string
}) {
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'}>
      <Flex justifyContent={'space-between'} alignItems={'center'} gap={2}>
        <Avatar size={'sm'} />
        <Flex>
          <Link to={`/profile/${userRef}`}>
            <Button variant={'link'} size={'sm'}>
              {displayName}
            </Button>
          </Link>
        </Flex>
      </Flex>
      <Button color={'twitter.700'} size={'xs'} variant={'ghost'}>
        Follow
      </Button>
    </Flex>
  )
}
