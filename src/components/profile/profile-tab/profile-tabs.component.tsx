import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { Suspense } from 'react'
import ProfileTabLoader from './profile-tab-loader.component'
import PostGrid from '../grid/post-grid/post-grid.component'
import LikeGrid from '../grid/like-grid/like-grid.component'

export default function ProfileTabs() {
  return (
    <Tabs isFitted={true} defaultIndex={0}>
      <TabList mb={{ base: '1em', md: '2em' }}>
        <Tab>POSTS</Tab>
        <Tab>LIKES</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Suspense fallback={<ProfileTabLoader />}>
            <PostGrid />
          </Suspense>
        </TabPanel>
        <TabPanel>
          <Suspense fallback={<ProfileTabLoader />}>
            <LikeGrid />
          </Suspense>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
