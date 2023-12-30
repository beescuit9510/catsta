import { Flex, Text } from '@chakra-ui/react'

export default function ProfileInfo({
  posts,
  followers,
  followings,
  bio,
}: {
  posts: number
  followers: number
  followings: number
  bio: string
}) {
  return (
    <>
      <Flex gap={5}>
        <Text>
          <Text as={'span'} fontWeight={'900'} mr={'0.25em'}>
            {posts}
          </Text>
          Posts
        </Text>
        <Text>
          <Text as={'span'} fontWeight={'900'} mr={'0.25em'}>
            {followers}
          </Text>
          Followers
        </Text>
        <Text>
          <Text as={'span'} fontWeight={'900'} mr={'0.25em'}>
            {followings}
          </Text>
          Following
        </Text>
      </Flex>
      <Text>{bio}</Text>
    </>
  )
}
