import { Avatar, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useUser } from '../../../hooks/queries/useUser'
import { auth } from '../../../utils/firebase'
import ProfileEdit from '../profile-edit/profile-edit.component'
import Follow from '../../common/follow/follow.component'
import { useFollowers } from '../../../hooks/queries/useFollowers'
import { useFollowings } from '../../../hooks/queries/useFollowings'
import UserListModal from '../user-list-modal/user-list-modal.component'

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
      {/* FIXME: image dose not appear right away after skeleton. */}
      <Avatar size={{ base: 'xl', md: '2xl' }} src={user!.photoURL} />
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
              />
              <UserListModal
                counts={user!.followings.length}
                caption={'followings'}
                title={'Followings'}
                query={useFollowings}
              />
            </Flex>
            <Text>{user!.bio}</Text>
          </>
        </Stack>
      </Flex>
    </Flex>
  )
}
