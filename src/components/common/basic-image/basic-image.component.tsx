import { Box, Image, ImageProps } from '@chakra-ui/react'

export default function BasicImage({ ...rest }: ImageProps) {
  /* TODO: fix image size */
  return (
    <Box boxSize={'full'}>
      <Image
        objectFit={'cover'}
        boxSize='full'
        fallbackSrc={'https://placehold.co/600x500?text=...'}
        {...rest}
      />
    </Box>
  )
}
