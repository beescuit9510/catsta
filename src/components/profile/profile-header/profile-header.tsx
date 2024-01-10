import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useUser } from '../../../hooks/queries/useUser'
import { auth } from '../../../utils/firebase'
import ProfileEdit from '../profile-edit/profile-edit.component'
import Follow from '../../common/follow/follow.component'
import { useFollowers } from '../../../hooks/queries/useFollowers'
import { useFollowings } from '../../../hooks/queries/useFollowings'
import UserListModal from '../user-list-modal/user-list-modal.component'
import ProfileAvatar from './profile-avatar/profile-avatar'
import MyNoFollowersYet from '../../common/placeholder/user-list-modal/my-empty-modal-placeholder/my-no-followers-yet'
import NoFollowersYet from '../../common/placeholder/user-list-modal/empty-modal-placeholder/no-followers-yet'
import MyNoFollowingsYet from '../../common/placeholder/user-list-modal/my-empty-modal-placeholder/my-no-followings-yet'
import NoFollowingsYet from '../../common/placeholder/user-list-modal/empty-modal-placeholder/no-followings-yet'

export default function ProfileHeader() {
  const { userId } = useParams()
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
              <Button
                variant={'profile-link'}
                cursor={'text'}
                _hover={{ textDecoration: 'none' }}
              >
                <Text as={'span'} fontWeight={'900'} mr={'0.25em'}>
                  {user!.posts}
                </Text>
                Posts
              </Button>
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
