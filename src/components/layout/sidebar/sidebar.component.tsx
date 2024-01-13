import { Flex, useColorModeValue, Box, FlexProps, Show } from '@chakra-ui/react'
import Logo from '../../common/logo/logo.component'
import {
  CreateItem,
  HomeItem,
  LogoutItem,
  NotificiationItem,
  ProfileItem,
  SearchItem,
  ToggleColorMode,
} from '../common/sidebar-items.component'

function Container({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      direction={'column'}
      minHeight={'100vh'}
      borderRight={'1px solid'}
      borderColor={useColorModeValue('gray.100', 'whiteAlpha.300')}
      position={'sticky'}
      top={0}
      left={0}
      py={8}
      px={{ base: 2, lg: 4 }}
    >
      {children}
    </Flex>
  )
}

function Stack({
  children,
  ...rest
}: { children: React.ReactNode } & FlexProps) {
  return (
    <Flex
      direction={'column'}
      gap={'15'}
      alignItems={'center'}
      paddingY={5}
      paddingX={2}
      {...rest}
    >
      {children}
    </Flex>
  )
}

export default function Sidebar() {
  return (
    <Container>
      <Stack flex={1}>
        <Show above='lg'>
          <Box marginLeft={'0.75rem'} marginRight={'auto'}>
            <Logo marginBottom={'1rem'} size={'lg'} />
          </Box>
        </Show>
        <HomeItem />
        <SearchItem />
        <CreateItem />
        <NotificiationItem />
        <ProfileItem />
      </Stack>

      <Stack>
        <ToggleColorMode />
        <LogoutItem />
      </Stack>
    </Container>
  )
}
