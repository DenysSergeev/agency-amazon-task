import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AccountsTable from './components/AccountsTable';
import ProfilesTable from './components/ProfilesTable';
import CampaignsTable from './components/CampaignsTable';
import { useState } from 'react';

const App = () => {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  );
  const sampleData = [
    {
      accountId: '1',
      email: 'matfraser@gmail.com',
      authToken: 'xyz123',
      creationDate: '2022-01-15',
    },
    {
      accountId: '2',
      email: 'richfroning@gmail.com',
      authToken: 'xyz1234',
      creationDate: '2022-01-16',
    },
    {
      accountId: '3',
      email: 'tiatoomey@gmail.com',
      authToken: 'xyz12345',
      creationDate: '2022-01-15',
    },
    {
      accountId: '4',
      email: 'davecastro@gmail.com',
      authToken: 'xyz123456',
      creationDate: '2022-01-16',
    },
    {
      accountId: '5',
      email: 'rickygarrard@gmail.com',
      authToken: 'xyz123',
      creationDate: '2022-01-15',
    },
    {
      accountId: '6',
      email: 'aleksandrusyk@gmail.com',
      authToken: 'xyz1234',
      creationDate: '2022-01-16',
    },
    {
      accountId: '7',
      email: 'anreuhoude@gmail.com',
      authToken: 'xyz12345',
      creationDate: '2022-01-15',
    },
    {
      accountId: '8',
      email: 'nike@gmail.com',
      authToken: 'xyz123456',
      creationDate: '2022-01-16',
    },
  ];

  const profilesData = [
    {
      profileId: '1',
      country: 'USA',
      marketplace: 'Amazon',
    },
    {
      profileId: '2',
      country: 'Ukraine',
      marketplace: 'Amazon',
    },
    {
      profileId: '3',
      country: 'UK',
      marketplace: 'Amazon',
    },
    {
      profileId: '4',
      country: 'Austria',
      marketplace: 'Amazon',
    },
    {
      profileId: '5',
      country: 'Germany',
      marketplace: 'Amazon',
    },
    {
      profileId: '6',
      country: 'Australia',
      marketplace: 'Amazon',
    },
    {
      profileId: '7',
      country: 'Swiss',
      marketplace: 'Amazon',
    },
    {
      profileId: '8',
      country: 'Netherlands',
      marketplace: 'Amazon',
    },
  ];

  const campaignsData = [
    {
      campaignId: '1',
      clicks: '100',
      cost: '500$',
      date: '2022-01-15',
    },
    {
      campaignId: '2',
      clicks: '110',
      cost: '1500$',
      date: '2022-01-15',
    },
    {
      campaignId: '3',
      clicks: '120',
      cost: '2500$',
      date: '2022-01-15',
    },
    {
      campaignId: '4',
      clicks: '130',
      cost: '3500$',
      date: '2022-01-15',
    },
    {
      campaignId: '5',
      clicks: '140',
      cost: '4500$',
      date: '2022-01-15',
    },
    {
      campaignId: '6',
      clicks: '150',
      cost: '5500$',
      date: '2022-01-15',
    },
    {
      campaignId: '7',
      clicks: '160',
      cost: '6500$',
      date: '2022-01-15',
    },
    {
      campaignId: '8',
      clicks: '170',
      cost: '7500$',
      date: '2022-01-15',
    },
  ];

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
          element={<Link to={`/accounts/${selectedAccountId}/profiles`} replace />}
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
