import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AccountsTable from './components/AccountsTable';
import ProfilesTable from './components/ProfilesTable';
import CampaignsTable from './components/CampaignsTable';
import { useState } from 'react';
import { sampleData, profilesData, campaignsData } from './data/data';

const App = () => {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  );

  const handleRowClick = (accountId: string) => {
    setSelectedAccountId(accountId);
    console.log(`Row clicked with accountId: ${accountId}`);
  };

  return (
    // <Router>
    //   <Routes>
    //     <Route
    //       path='/'
    //       element={
    //         <AccountsTable
    //           data={sampleData}
    //           onRowClick={handleRowClick}
    //           selectedAccountId={selectedAccountId}
    //         />
    //       }
    //     />
    //     <Route
    //       path='/profileId'
    //       element={
    //         <ProfilesTable
    //           data={profilesData}
    //           // handleSort={handleRowClick}
    //           selectedAccountId={selectedAccountId}
    //         />
    //       }
    //     />
    //     <Route
    //       path='/campaignId'
    //       element={
    //         <CampaignsTable
    //           data={campaignsData}
    //           // handleSort={handleRowClick}
    //           selectedAccountId={selectedAccountId}
    //         />
    //       }
    //     />
    //     {/* Add other routes as needed */}
    //   </Routes>
    // </Router>

    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <AccountsTable
              data={sampleData}
              onRowClick={handleRowClick}
              selectedAccountId={selectedAccountId}
            />
          }
        />
        <Route
          path='/accounts/:accountId'
          element={
            <Link to={`/accounts/${selectedAccountId}/profiles`} replace />
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
  );
};

export default App;
