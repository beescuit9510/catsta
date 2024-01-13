import { Divider } from '@chakra-ui/react'
import useInfiniteNotifications from '../../hooks/queries/infinite/useInfiniteNotifications'
import { Fragment, useEffect } from 'react'
import { auth } from '../../utils/firebase'
import useReadNotification from '../../hooks/mutations/useReadNotification'
import useHasFocus from '../../hooks/useHasFocus'
import LoadMoreBtn from '../../components/common/load-more-btn/load-more-btn.component'
import { Body, Content, Header } from './common/notifications'

const Actions = {
  following: 'is following you!',
  likedPost: 'liked your post!',
  createdComment: 'created a comment for you post!',
} as const

export default function NotificationList() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteNotifications()

  const focus = useHasFocus()
  const { mutate } = useReadNotification()

  useEffect(() => {
    if (!focus) return

    const setTimeoutFn = setTimeout(() => {
      const ids = data?.pages
        .flatMap((page) => page.data)
        .filter((v) => v.readAt === null)
        .map((v) => v.id)

      if (!ids || ids.length === 0) return

      mutate({ userId: auth.currentUser!.uid, notificationIds: ids! })
    }, 1000)

    return () => clearTimeout(setTimeoutFn)
  }, [data, focus])

  return (
    <>
      <Divider />
      {data?.pages
        .flatMap((page) => page.data)
        .map((v, idx) => {
          const { createdAt, sender, action, post, readAt } = v
          return (
            <Fragment key={createdAt + idx}>
              <Content readYet={readAt === null}>
                <Header
                  photoURL={sender.photoURL}
                  userId={sender.userId}
                  displayName={sender.displayName}
                  action={Actions[action]}
                />
                {post && (
                  <Body
                    photoURL={post.photoURL}
                    displayName={sender.displayName}
                    comment={post.comment}
                  />
                )}
              </Content>
              <Divider />
            </Fragment>
          )
        })}
      <LoadMoreBtn
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </>
  )
}
