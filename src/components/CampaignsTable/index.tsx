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

interface Campaign {
  campaignId: string;
  clicks: string;
  cost: string;
  date: string;
}

interface CampaignsTableProps {
  data: Campaign[];
  selectedAccountId: string | null;
}

const CampaignsTable: React.FC<CampaignsTableProps> = ({
  data,
  selectedAccountId,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Campaign;
    direction: 'asc' | 'desc';
  }>({ key: 'campaignId', direction: 'asc' });

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

  const handleSort = (key: keyof Campaign) => {
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

  const filteredData = sortedData.filter(campaign =>
    Object.values(campaign).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className='container mx-auto mt-4'>
      <h2 className='text-2xl font-bold mb-4'>Campaigns</h2>
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
                  sortConfig.key === 'campaignId' && 'bg-gray-200'
                }`}
                onClick={() => handleSort('campaignId')}
              >
                Campaign ID
              </TableCell>
              <TableCell
                className={`py-2 px-4 font-bold border cursor-pointer ${
                  sortConfig.key === 'clicks' && 'bg-gray-200'
                }`}
                onClick={() => handleSort('clicks')}
              >
                Clicks
              </TableCell>
              <TableCell
                className={`py-2 px-4 border cursor-pointer ${
                  sortConfig.key === 'cost' && 'bg-gray-200'
                }`}
                onClick={() => handleSort('cost')}
              >
                Cost
              </TableCell>
              <TableCell
                className={`py-2 px-4 border cursor-pointer ${
                  sortConfig.key === 'date' && 'bg-gray-200'
                }`}
                onClick={() => handleSort('date')}
              >
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map(campaign => (
              <TableRow
                key={campaign.campaignId}
                className={`border ${
                  selectedAccountId === campaign.campaignId ? 'bg-blue-200' : ''
                }`}
              >
                <TableCell className='py-2 px-4 border'>
                  {campaign.campaignId}
                </TableCell>
                <TableCell className='py-2 px-4 border'>
                  {campaign.clicks}
                </TableCell>
                <TableCell className='py-2 px-4 border'>
                  {campaign.cost}
                </TableCell>
                <TableCell className='py-2 px-4 border'>
                  {campaign.date}
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

export default CampaignsTable;
