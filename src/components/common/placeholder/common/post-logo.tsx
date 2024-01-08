import { Center, Icon } from '@chakra-ui/react'
import { MdOutlinePhotoLibrary } from 'react-icons/md'

export default function PostLogo() {
  return (
    <Center>
      <Icon as={MdOutlinePhotoLibrary} fontSize={'3rem'} />
    </Center>
  )
}
