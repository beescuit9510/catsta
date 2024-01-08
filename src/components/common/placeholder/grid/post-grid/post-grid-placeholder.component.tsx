import PostLogo from '../../common/post-logo'
import PlaceholderText from '../../common/placeholder-text'
import Placeholder from '../placeholder.component'

export default function PostGridPlaceholder() {
  return (
    <Placeholder>
      <PostLogo />
      <PlaceholderText>No Posts Yet</PlaceholderText>
    </Placeholder>
  )
}
