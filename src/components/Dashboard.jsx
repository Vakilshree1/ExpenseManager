// import React from 'react'
// import Navbar from './Navbar'
// import ExpensesTable from './ExpenseTable'

// export const Dashboard = () => {
//   return (
//     <>
//     <Navbar></Navbar>
//     <ExpensesTable></ExpensesTable>
//     </>
//   )
// }


import React from 'react';
import Navbar from './Navbar';
import ExpensesTable from './ExpenseTable';
import { Box } from '@mui/material';

export const Dashboard = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box sx={{ flex: 1, overflowY: 'auto', marginTop: '64px' }}>
        <ExpensesTable />
      </Box>
    </Box>
  );
};
