import { useToast } from '@chakra-ui/react'

export default function useShowToast() {
  const toast = useToast()

  const showToast = (
    status: 'info' | 'warning' | 'success' | 'error' | 'loading',
    title: string,
    description = ''
  ) => {
    toast({
      title,
      description,
      status,
      duration: 2000,
      isClosable: true,
      position: 'top',
    })
  }
  return showToast
}
