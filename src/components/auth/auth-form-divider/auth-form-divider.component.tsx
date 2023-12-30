import { AbsoluteCenter, Box, Divider } from '@chakra-ui/react'

export default function AuthFormDivider() {
  return (
    <Box position='relative' paddingY='7'>
      <Divider />
      <AbsoluteCenter>OR</AbsoluteCenter>
    </Box>
  )
}
