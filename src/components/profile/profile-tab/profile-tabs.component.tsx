import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import ProfileGrid from '../profile-grid/profile-grid.component'
import { Suspense } from 'react'
import ProfileTabLoader from './profile-tab-loader.component'

export default function ProfileTabs() {
  return (
    <Tabs isFitted={true} defaultIndex={1}>
      <TabList mb={{ base: '1em', md: '2em' }}>
        <Tab>POSTS</Tab>
        <Tab>LIKES</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Suspense fallback={<ProfileTabLoader />}>
            <ProfileGrid />
          </Suspense>
        </TabPanel>
        <TabPanel>
          <Suspense fallback={<ProfileTabLoader />}>
            <ProfileGrid />
          </Suspense>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
