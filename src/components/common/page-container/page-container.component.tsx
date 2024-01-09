import { Center, Container } from '@chakra-ui/react'
import ErrorBoundary from '../../../routes/error-boundary/error-boundary.component'
import Error from '../../../routes/error-boundary/error.component'

export default function PageContainer({
  fallback = <Error>Sorry, an unexpected error has occurred</Error>,
  children,
  size = 'sm',
}: {
  fallback?: React.ReactNode
  children: React.ReactNode
  size?: 'sm' | 'lg'
}) {
  return (
    <ErrorBoundary fallback={fallback}>
      <Center marginY={20}>
        <Container maxW={`container.${size}`}>{children}</Container>
      </Center>
    </ErrorBoundary>
  )
}
