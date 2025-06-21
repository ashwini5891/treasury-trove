import React from 'react';
import { Box, Typography, useTheme, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTransactions } from "../../data/mockDataTransactions";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TransactionForm from "../../components/TransactionForm";

// TransactionForm component has been moved to src/components/TransactionForm.jsx

const Transactions = () => {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  
  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveTransaction = (transactionData) => {
    // TODO: Implement save logic
    console.log('Saving transaction:', transactionData);
    // Reset form or show success message
  };
  const handleAddTransaction = () => {
    handleAddClick();
  };

  const handleEditTransaction = (id) => {
    // TODO: Implement edit transaction logic
    console.log('Edit transaction:', id);
  };

  const handleDeleteTransaction = (id) => {
    // TODO: Implement delete transaction logic
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      console.log('Delete transaction:', id);
    }
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { 
      field: "ref", 
      headerName: "Reference", 
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[400]}>
          {params.value}
        </Typography>
      )
    },
    { 
      field: "date", 
      headerName: "Date", 
      flex: 1 
    },
    { 
      field: "type", 
      headerName: "Type", 
      flex: 1,
      renderCell: (params) => (
        <Box
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={
            params.value === "Donation"
              ? colors.greenAccent[900]
              : params.value === "Fundraising"
              ? colors.blueAccent[900]
              : colors.redAccent[900]
          }
          borderRadius="4px"
          width="80%"
        >
          {params.value}
        </Box>
      )
    },
    { 
      field: "description", 
      headerName: "Description", 
      flex: 2 
    },
    { 
      field: "amount", 
      headerName: "Amount", 
      flex: 1,
      renderCell: (params) => (
        <Typography
          color={params.row.isIncome ? colors.greenAccent[400] : colors.redAccent[400]}
          fontWeight="bold"
        >
          {params.value}
        </Typography>
      )
    }
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Transactions" subtitle="List of all transactions" />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddTransaction}
          sx={{
            backgroundColor: colors.blueAccent[600],
            '&:hover': {
              backgroundColor: colors.blueAccent[700],
            },
            textTransform: 'none',
            fontWeight: 'bold',
            padding: '8px 16px',
            borderRadius: '4px',
          }}
        >
          Add Transaction
        </Button>
      </Box>
      <Box
        m="20px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataTransactions} columns={columns} />
      </Box>
      <TransactionForm 
        open={isAddModalOpen} 
        onClose={handleModalClose} 
        onSave={handleSaveTransaction}
      />
    </Box>
  );
};

export default Transactions;
