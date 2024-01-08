import { Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useUser } from '../../../hooks/queries/useUser'
import { auth } from '../../../utils/firebase'
import ProfileEdit from '../profile-edit/profile-edit.component'
import Follow from '../../common/follow/follow.component'
import { useFollowers } from '../../../hooks/queries/useFollowers'
import { useFollowings } from '../../../hooks/queries/useFollowings'
import UserListModal from '../user-list-modal/user-list-modal.component'
import MyNoFollowersYet from '../user-list-modal/my-empty-modal-placeholder/my-no-followers-yet'
import NoFollowersYet from '../user-list-modal/empty-modal-placeholder/no-followers-yet'
import MyNoFollowingsYet from '../user-list-modal/my-empty-modal-placeholder/my-no-followings-yet'
import NoFollowingsYet from '../user-list-modal/empty-modal-placeholder/no-followings-yet'
import ProfileAvatar from './profile-avatar/profile-avatar'

export default function ProfileHeader() {
  const { userId } = useParams()
  // TODO: use stale data isStale
  const { data: user } = useUser(userId!)
  const isCurrentUser = auth.currentUser!.uid === userId

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      alignItems={'center'}
      gap={3}
    >
      <ProfileAvatar photoURL={user!.photoURL} userId={userId!} />
      <Flex>
        <Stack>
          <Flex
            alignItems={'center'}
            direction={{ base: 'column', md: 'row' }}
            gap={3}
          >
            <Text>{user!.displayName}</Text>
            {isCurrentUser && <ProfileEdit userId={userId} />}
            {!isCurrentUser && <Follow followingUserId={userId!} />}
          </Flex>

          <>
            <Flex gap={5}>
              <Text
                display={'flex'}
                variant={'link'}
                fontWeight={'400'}
                color={useColorModeValue('black', 'whiteAlpha.900')}
              >
                <Text as={'span'} fontWeight={'900'} mr={'0.25em'}>
                  {user!.posts}
                </Text>
                Posts
              </Text>
              <UserListModal
                counts={user!.followers.length}
                caption={'followers'}
                title={'Follwers'}
                query={useFollowers}
                placeholder={
                  isCurrentUser ? <MyNoFollowersYet /> : <NoFollowersYet />
                }
              />
              <UserListModal
                counts={user!.followings.length}
                caption={'followings'}
                title={'Followings'}
                query={useFollowings}
                placeholder={
                  isCurrentUser ? <MyNoFollowingsYet /> : <NoFollowingsYet />
                }
              />
            </Flex>
            <Text>{user!.bio}</Text>
          </>
        </Stack>
      </Flex>
    </Flex>
  )
}
