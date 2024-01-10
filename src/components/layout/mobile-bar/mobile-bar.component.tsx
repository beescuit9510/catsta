import { Flex, FlexProps, useColorModeValue } from '@chakra-ui/react'
import Logo from '../../common/logo/logo.component'
import {
  CreateItem,
  HomeItem,
  LogoutItem,
  ProfileItem,
  SearchItem,
  ToggleColorMode,
} from '../common/sidebar-items.component'

export function MobileFlex({
  children,
  ...rest
}: { children: React.ReactNode } & FlexProps) {
  return (
    <Flex
      zIndex={1}
      direction={'row'}
      px={{ base: 2, lg: 4 }}
      height={'3.5rem'}
      position={'sticky'}
      borderColor={useColorModeValue('gray.100', 'whiteAlpha.300')}
      bg={useColorModeValue('white', 'black')}
      {...rest}
    >
      <Flex
        flex={1}
        alignItems={'center'}
        justifyContent={'space-around'}
        padding={5}
      >
        {children}
      </Flex>
    </Flex>
  )
}

export default function MobileTopBar() {
  return (
    <MobileFlex borderBottomWidth={'1px'} top={0}>
      <Flex
        flex={1}
        alignItems={'center'}
        justifyContent={'space-around'}
        padding={5}
      >
        <Flex flex={1} justifyContent={'space-between'} alignItems={'center'}>
          <Logo size={'xl'} margin={0} />

          <Flex>
            <ToggleColorMode />
          </Flex>
        </Flex>
      </Flex>
    </MobileFlex>
  )
}

export function MobileBottomBar() {
  return (
    <MobileFlex borderTopWidth={'1px'} bottom={0}>
      <HomeItem />
      <SearchItem />
      <CreateItem />
      <ProfileItem />
      <LogoutItem />
    </MobileFlex>
  )
}
