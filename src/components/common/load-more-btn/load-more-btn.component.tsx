import { Button } from '@chakra-ui/react'

export default function LoadMoreBtn({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: {
  hasNextPage: boolean
  isFetchingNextPage: boolean
  // eslint-disable-next-line @typescript-eslint/ban-types
  fetchNextPage: Function
}) {
  return (
    <>
      {hasNextPage && !isFetchingNextPage && (
        <Button onClick={() => fetchNextPage()}>Load more</Button>
      )}
    </>
  )
}
