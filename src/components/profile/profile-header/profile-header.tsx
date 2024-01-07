import {
  Avatar,
  AvatarBadge,
  Center,
  Flex,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useUser } from '../../../hooks/queries/useUser'
import { auth } from '../../../utils/firebase'
import ProfileEdit from '../profile-edit/profile-edit.component'
import Follow from '../../common/follow/follow.component'
import { useFollowers } from '../../../hooks/queries/useFollowers'
import { useFollowings } from '../../../hooks/queries/useFollowings'
import UserListModal from '../user-list-modal/user-list-modal.component'
import { RxAvatar } from 'react-icons/rx'
import useUserPresence from '../../../hooks/useUserPresence'

export default function ProfileHeader() {
  const { userId } = useParams()
  const { data: user } = useUser(userId!)
  // TODO: use stale data isStale
  const isCurrentUser = auth.currentUser!.uid === userId
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900')
  const presence = useUserPresence(userId!)

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      alignItems={'center'}
      gap={3}
    >
      {/* FIXME: image dose not appear right away after skeleton. */}
      {/* TODO: AVATAR dose not appear */}
      {/* TODO: empty space placeholder */}
      {/* TODO: refactor */}
      <Avatar size={{ base: 'xl', md: '2xl' }} src={user!.photoURL}>
        {presence?.connections && (
          <AvatarBadge
            boxSize='0.75em'
            borderWidth={'0.15em'}
            right={'0.15em'}
            bottom={'0.15em'}
            bg='green.500'
          />
        )}
      </Avatar>
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
                  isCurrentUser ? (
                    <Stack textAlign={'center'}>
                      <Center>
                        <Icon as={RxAvatar} fontSize={'3.5rem'} />
                      </Center>

                      <Text fontSize={'xl'} fontWeight={'700'}>
                        Followers
                      </Text>
                      <Text color={textColor}>
                        You'll sell all the people who follow you here.
                      </Text>
                    </Stack>
                  ) : (
                    <Stack textAlign={'center'}>
                      <Center>
                        <Icon as={RxAvatar} fontSize={'3.5rem'} />
                      </Center>

                      <Text fontSize={'xl'} fontWeight={'700'}>
                        No Followers Yet
                      </Text>
                    </Stack>
                  )
                }
              />
              <UserListModal
                counts={user!.followings.length}
                caption={'followings'}
                title={'Followings'}
                query={useFollowings}
                placeholder={
                  isCurrentUser ? (
                    <Stack textAlign={'center'}>
                      <Center>
                        <Icon as={RxAvatar} fontSize={'3.5rem'} />
                      </Center>
                      <Text fontSize={'xl'} fontWeight={'700'}>
                        People you follow
                      </Text>
                      <Text color={textColor}>
                        Once you follow people, you'll see them here.
                      </Text>
                    </Stack>
                  ) : (
                    <Stack textAlign={'center'}>
                      <Center>
                        <Icon as={RxAvatar} fontSize={'3.5rem'} />
                      </Center>

                      <Text fontSize={'xl'} fontWeight={'700'}>
                        No Followings Yet
                      </Text>
                    </Stack>
                  )
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
