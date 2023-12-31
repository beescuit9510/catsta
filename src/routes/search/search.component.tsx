import { Container, Stack } from '@chakra-ui/react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { Suspense, useState } from 'react'
import SearchLoader from '../../components/search/search-loader/search-loader.component'
import SearchedUserList from '../../components/search/searched-user-list/searched-user-list.component'

export default function Search() {
  const [keyword, setKeyword] = useState('')

  return (
    <Container marginTop={{ base: '2rem', md: '10rem' }}>
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

        <Suspense fallback={<SearchLoader />}>
          <SearchedUserList keyword={keyword} />
        </Suspense>
      </Stack>
    </Container>
  )
}
