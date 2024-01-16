import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
} from '@mui/material';

interface Account {
  accountId: string;
  email: string;
  authToken: string;
  creationDate: string;
}

interface AccountsTableProps {
  data: Account[];
  onRowClick: (accountId: string) => void;
  selectedAccountId: string | null;
}

const AccountsTable: React.FC<AccountsTableProps> = ({
  data,
  onRowClick,
  selectedAccountId,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Account;
    direction: 'asc' | 'desc';
  }>({ key: 'accountId', direction: 'asc' });

  const handleChangePage = (_event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (key: keyof Account) => {
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

  const filteredData = sortedData.filter(account =>
    Object.values(account).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className='container mx-auto mt-4'>
      <h2 className='text-2xl font-bold mb-4'>Accounts</h2>
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
                  sortConfig.key === 'accountId' && 'bg-gray-200'
                }`}
                onClick={() => handleSort('accountId')}
              >
                Account ID
              </TableCell>
              <TableCell
                className={`py-2 px-4 font-bold border cursor-pointer ${
                  sortConfig.key === 'email' && 'bg-gray-200'
                }`}
                onClick={() => handleSort('email')}
              >
                Email
              </TableCell>
              <TableCell
                className={`py-2 px-4 border cursor-pointer ${
                  sortConfig.key === 'authToken' && 'bg-gray-200'
                }`}
                onClick={() => handleSort('authToken')}
              >
                Auth Token
              </TableCell>
              <TableCell
                className={`py-2 px-4 border cursor-pointer ${
                  sortConfig.key === 'creationDate' && 'bg-gray-200'
                }`}
                onClick={() => handleSort('creationDate')}
              >
                Creation Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map(account => (
              <TableRow
                key={account.accountId}
                onClick={() => onRowClick(account.accountId)}
                className={`border ${
                  selectedAccountId === account.accountId ? 'bg-blue-200' : ''
                }`}
              >
                <TableCell className='py-2 px-4 border'>
                  {account.accountId}
                </TableCell>
                <TableCell className='py-2 px-4 border'>
                  {account.email}
                </TableCell>
                <TableCell className='py-2 px-4 border'>
                  {account.authToken}
                </TableCell>
                <TableCell className='py-2 px-4 border'>
                  {account.creationDate}
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

export default AccountsTable;
