import { Avatar, Flex, Stack, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useUser } from '../../../hooks/queries/useUser'
import { auth } from '../../../utils/firebase'
import ProfileEdit from '../profile-edit/profile-edit.component'
import Follow from '../../common/follow/follow.component'

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
            {!isCurrentUser && <Follow userId={userId!} />}
          </Flex>

          <>
            <Flex gap={5}>
              <Text>
                <Text as={'span'} fontWeight={'900'} mr={'0.25em'}>
                  {user!.posts}
                </Text>
                Posts
              </Text>
              <Text>
                <Text as={'span'} fontWeight={'900'} mr={'0.25em'}>
                  {user!.followers.length}
                </Text>
                Followers
              </Text>
              <Text>
                <Text as={'span'} fontWeight={'900'} mr={'0.25em'}>
                  {user!.followings.length}
                </Text>
                Following
              </Text>
            </Flex>
            <Text>{user!.bio}</Text>
          </>
        </Stack>
      </Flex>
    </Flex>
  )
}
