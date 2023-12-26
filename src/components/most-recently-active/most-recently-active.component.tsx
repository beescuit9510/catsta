import { Button, Flex, Text } from '@chakra-ui/react'
import MostRecentlyActiveUser from '../most-recently-active-user/most-recently-active-user.component'

export default function MostRecentlyActive() {
  return (
    <Flex display={{ base: 'none', md: 'block' }}>
      <Flex
        width={'full'}
        direction={'column'}
        height={'fit-content'}
        position={'sticky'}
        top={'5%'}
        gap={3}
      >
        <Flex
          w={'250px'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Text fontWeight={'500'} size={'sm'}>
            Most recently active
          </Text>
          <Button size={'xs'} variant={'ghost'}>
            See More
          </Button>
        </Flex>
        <MostRecentlyActiveUser displayName='Byunduck' userRef='ABC' />
        <MostRecentlyActiveUser displayName='Byunduck' userRef='ABC' />
        <MostRecentlyActiveUser displayName='Byunduck' userRef='ABC' />
      </Flex>
    </Flex>
  )
}
