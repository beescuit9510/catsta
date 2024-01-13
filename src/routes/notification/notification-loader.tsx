import { Fragment } from 'react'
import { Content } from './common/notifications'
import {
  Divider,
  Flex,
  Skeleton,
  SkeletonCircle,
  VStack,
} from '@chakra-ui/react'

export default function NotificationLoader({ length }: { length: number }) {
  return Array(length)
    .fill(1)
    .map((v, idx) => (
      <Fragment key={v + idx}>
        <Content readYet={false}>
          <Flex gap={4} justifyContent={'center'} alignItems={'center'}>
            <SkeletonCircle size={'3.25rem'} />
            <VStack alignItems={'flex-start'} gap={2} mx={'auto'} flex={1}>
              <Skeleton height='12px' width='150px' />
            </VStack>
          </Flex>
          <Skeleton height='200px' width='100%' />
        </Content>
        <Divider />
      </Fragment>
    ))
}
