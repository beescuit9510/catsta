import { Stack } from '@chakra-ui/react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { Suspense, useState } from 'react'
import SearchedUserList from '../../components/search/searched-user-list/searched-user-list.component'
import UserAvatarLoader from '../../components/common/user-avatar-loader/user-avatar-loader.component'
import Error from '../error-boundary/error.component'
import PageContainer from '../../components/common/page-container/page-container.component'

export default function Search() {
  const [keyword, setKeyword] = useState('')

  return (
    <PageContainer
      fallback={
        <Error>
          Sorry, an unexpected error has occurred in the search page
        </Error>
      }
    >
      <Stack spacing={5}>
        <InputGroup>
          <Input
            borderRadius={'99'}
            variant='filled'
            placeholder='Search Username'
            onChange={(event) => setKeyword(event.target.value)}
          />
          <InputRightElement>
            <FaSearch />
          </InputRightElement>
        </InputGroup>

        <Suspense fallback={<UserAvatarLoader length={3} />}>
          <SearchedUserList keyword={keyword} />
        </Suspense>
      </Stack>
    </PageContainer>
  )
}
