import {
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalProps,
  useColorModeValue,
} from '@chakra-ui/react'

export default function BasicModal({
  isOpen,
  onClose,
  children,
  ...rest
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
} & ModalProps) {
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={() => onClose()}
      {...rest}
    >
      <Flex>
        <ModalOverlay />
        <ModalContent
          width={'90%'}
          bg={useColorModeValue('gray.50', 'gray.900')}
        >
          <ModalCloseButton />
          {children}
        </ModalContent>
      </Flex>
    </Modal>
  )
}
