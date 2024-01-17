import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AccountsTable from './components/AccountsTable'
import ProfilesTable from './components/ProfilesTable'
import CampaignsTable from './components/CampaignsTable'
import { useState } from 'react'
import { sampleData, profilesData, campaignsData } from './data/data'
import ResponsiveAppBar from './components/AppBar'

const App = () => {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  )

  return (
    <div className='flex flex-row flex-wrap justify-center'>
      <div className='flex justify-center items-center h-screen px-10'>
        <Router>
          <ResponsiveAppBar />
          <div className='tables'>
            <Routes>
              <Route
                path='/'
                element={
                  <AccountsTable
                    data={sampleData}
                    selectedAccountId={selectedAccountId}
                  />
                }
              />
              <Route
                path='/accounts/:accountId/profiles'
                element={
                  <ProfilesTable
                    data={profilesData}
                    selectedAccountId={selectedAccountId}
                  />
                }
              />
              <Route
                path='/accounts/:accountId/campaigns'
                element={
                  <CampaignsTable
                    data={campaignsData}
                    selectedAccountId={selectedAccountId}
                  />
                }
              />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  )
}

export default App
