import FollowingBtn from '../following-btn/following-btn.component'
import UnfollowingBtn from '../unfollowing-btn/unfollowing-btn.component'
import { useUser } from '../../../hooks/queries/useUser'
import { auth } from '../../../utils/firebase'

export default function Follow({ userId }: { userId: string }) {
  const { data: currentUser } = useUser(auth.currentUser!.uid)

  return (
    <>
      {currentUser!.followings.includes(userId) ? (
        <UnfollowingBtn userId={currentUser!.id} followingUserId={userId} />
      ) : (
        <FollowingBtn userId={currentUser!.id} followingUserId={userId} />
      )}
    </>
  )
}
