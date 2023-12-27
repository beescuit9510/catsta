import { Button, Flex, Text } from '@chakra-ui/react'
import ActiveUser from '../who-active-user/who-active-user.component'

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
          <Text fontWeight={'800'}>Who is active?</Text>
          <Button size={'sm'} variant={'ghost'}>
            See More
          </Button>
        </Flex>
        <ActiveUser displayName='Byunduck' userRef='ABC' />
        <ActiveUser displayName='Byunduck' userRef='ABC' />
        <ActiveUser displayName='Byunduck' userRef='ABC' />
      </Flex>
    </Flex>
  )
}
