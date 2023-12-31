import { Avatar, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useCachedUser } from '../../../hooks/queries/useUser'
import { auth } from '../../../utils/firebase'
import UnfollowingBtn from '../unfollowing-btn/unfollowing-btn.component'
import FollowingBtn from '../following-btn/following-btn.component'

export default function UserAvatar({
  userId,
  displayName,
  photoURL,
}: {
  userId: string
  displayName: string
  photoURL: string
}) {
  const currentUser = useCachedUser(auth.currentUser!.uid)

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'}>
      <Flex justifyContent={'space-between'} alignItems={'center'} gap={2}>
        <Avatar src={photoURL} />
        <Flex direction={'column'} alignItems={'flex-start'}>
          <Link to={`/${userId}`}>
            <Text>{displayName}</Text>
          </Link>
          <Text fontSize={12}>Active 6h ago</Text>
        </Flex>
      </Flex>
      {/* TODO: refactor shared code */}
      {currentUser?.id !== userId && (
        <>
          {currentUser!.followings.includes(userId) ? (
            <UnfollowingBtn userId={currentUser!.id} followingUserId={userId} />
          ) : (
            <FollowingBtn userId={currentUser!.id} followingUserId={userId} />
          )}
        </>
      )}
    </Flex>
  )
}
