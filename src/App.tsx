import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AccountsTable from './components/AccountsTable'
import ProfilesTable from './components/ProfilesTable'
import CampaignsTable from './components/CampaignsTable'
import { useState } from 'react'
import { sampleData, profilesData, campaignsData } from './data/data'

const App = () => {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  )

  // const handleRowClick = (id: string) => {
  //   setSelectedAccountId(id)
  // }

  return (
    <div className='flex justify-center items-center h-screen'>
      <Router>
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
      </Router>
    </div>
  )
}

export default App
