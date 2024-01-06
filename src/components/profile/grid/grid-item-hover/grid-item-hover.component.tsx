import { Box, Flex, GridItem } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import PostImage from '../../../common/post-image/post-image.component'

export default function GridItemHover({
  to,
  src,
  children,
}: {
  to: string
  src: string
  children: React.ReactNode
}) {
  return (
    <GridItem cursor={'pointer'} position={'relative'} role='group'>
      <Link to={to}>
        <PostImage src={src} />

        <Box
          position={'absolute'}
          bg={'black'}
          top={0}
          left={0}
          bottom={0}
          right={0}
          opacity={0}
          _groupHover={{ bg: 'black', opacity: 0.2 }}
          transition={'all 150ms ease'}
        />
        <Flex
          position={'absolute'}
          top={0}
          left={0}
          bottom={0}
          right={0}
          color={'white'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={{ base: 2, md: 5 }}
          opacity={0}
          _groupHover={{ opacity: 1 }}
          transition={'all 150ms ease'}
        >
          {children}
        </Flex>
      </Link>
    </GridItem>
  )
}
