import { Box, Image, ImageProps } from '@chakra-ui/react'

export default function PostImage({
  src,
  ...rest
}: {
  src?: string
} & ImageProps) {
  /* TODO: fix image size */
  return (
    <Box boxSize={'full'}>
      <Image
        src={src}
        objectFit={'cover'}
        boxSize='full'
        fallbackSrc={'https://placehold.co/600x500?text=...'}
        {...rest}
      />
    </Box>
  )
}
