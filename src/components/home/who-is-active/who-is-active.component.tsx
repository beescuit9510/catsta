import { Button, Flex, Text } from '@chakra-ui/react'
import UserAvatar from '../../common/user-avatar/user-avatar.component'

export default function WhoIsActive() {
  return (
    <Flex display={{ base: 'none', lg: 'block' }}>
      <Flex
        width={'full'}
        direction={'column'}
        height={'fit-content'}
        position={'sticky'}
        top={'5%'}
        gap={5}
      >
        <Flex
          w={'300px'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Text fontWeight={'600'}>Suggested for you</Text>
          <Button size={'sm'} variant={'ghost'}>
            See More
          </Button>
        </Flex>
        <UserAvatar
          displayName='Byunduck'
          userId='ABC'
          photoURL=''
          bio='Byunduck'
        />
        <UserAvatar
          displayName='Byunduck'
          userId='ABC'
          photoURL=''
          bio='Byunduck'
        />
        <UserAvatar
          displayName='Byunduck'
          userId='ABC'
          photoURL=''
          bio='Byunduck'
        />
      </Flex>
    </Flex>
  )
}
