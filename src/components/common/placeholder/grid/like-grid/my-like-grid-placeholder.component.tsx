import PlaceholderText from '../../common/placeholder-text'
import PlaceholderLink from '../../common/placeholder-link'
import Placeholder from '../placeholder.component'

export default function MyLikeGridPlaceholder() {
  return (
    <Placeholder>
      <PlaceholderText>Like a post and share with the world!</PlaceholderText>
      <PlaceholderLink to='/'>like your friends' post!</PlaceholderLink>
    </Placeholder>
  )
}
