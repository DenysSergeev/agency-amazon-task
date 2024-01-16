import * as React from 'react';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
} from '@mui/material';

interface Profile {
  profileId: string;
  country: string;
  marketplace: string;
}

interface ProfilesTableProps {
  data: Profile[];
  selectedAccountId: string | null;
}

const ProfilesTable: React.FC<ProfilesTableProps> = ({
  data,
  selectedAccountId,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Profile;
    direction: 'asc' | 'desc';
  }>({ key: 'profileId', direction: 'asc' });

  const handleChangePage = (
    _event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (key: keyof Profile) => {
    setSortConfig(prevSortConfig => ({
      key,
      direction:
        prevSortConfig.key === key && prevSortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    }));
  };

  const sortedData = data.slice().sort((a, b) => {
    const sortOrder = sortConfig.direction === 'asc' ? 1 : -1;
    return a[sortConfig.key].localeCompare(b[sortConfig.key]) * sortOrder;
  });

  const filteredData = sortedData.filter(profile =>
    Object.values(profile).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className='container mx-auto mt-4'>
      <h2 className='text-2xl font-bold mb-4'>Profiles</h2>
      <TextField
        label='Search'
        variant='outlined'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className='mb-3'
      />
      <TableContainer
        component={Paper}
        className='border rounded-lg overflow-hidden'
      >
        <Table className='min-w-full'>
          <TableHead>
            <TableRow>
              <TableCell
                className={`py-2 px-4 font-bold border cursor-pointer ${
                  sortConfig.key === 'profileId' && 'bg-gray-200'
                }`}
                onClick={() => handleSort('profileId')}
              >
                Profile ID
              </TableCell>
              <TableCell
                className={`py-2 px-4 font-bold border cursor-pointer ${
                  sortConfig.key === 'country' && 'bg-gray-200'
                }`}
                onClick={() => handleSort('country')}
              >
                Country
              </TableCell>
              <TableCell
                className={`py-2 px-4 border cursor-pointer ${
                  sortConfig.key === 'marketplace' && 'bg-gray-200'
                }`}
                onClick={() => handleSort('marketplace')}
              >
                Marketplace
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map(profile => (
              <TableRow
                key={profile.profileId}
                className={`border ${selectedAccountId ? '' : 'd-none'}`}
              >
                <TableCell className='py-2 px-4 border'>
                  {profile.profileId}
                </TableCell>
                <TableCell className='py-2 px-4 border'>
                  {profile.country}
                </TableCell>
                <TableCell className='py-2 px-4 border'>
                  {profile.marketplace}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default ProfilesTable;
