import React from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { mockDataTransactions } from "../../data/mockDataTransactions";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddIcon from "@mui/icons-material/Add";
import EventIcon from "@mui/icons-material/Event";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import TransactionForm from "../../components/TransactionForm";
import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  
  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveTransaction = (transactionData) => {
    // TODO: Implement save logic
    console.log('Saving transaction from dashboard:', transactionData);
    // Reset form or show success message
  };

  return (
    <Box m="10px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" />
        <Box display="flex" gap="10px">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
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
          <Button
            variant="contained"
            startIcon={<EventIcon />}
            sx={{
              backgroundColor: colors.greenAccent[600],
              '&:hover': {
                backgroundColor: colors.greenAccent[700],
              },
              textTransform: 'none',
              fontWeight: 'bold',
              padding: '8px 16px',
              borderRadius: '4px',
            }}
          >
            Add Event
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 - Top Row */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.background.paper}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p="20px"
          borderRadius="8px"
          boxShadow={theme.shadows[1]}
        >
          <SavingsIcon sx={{ color: colors.greenAccent[600], fontSize: "48px", mb: 1 }} />

          <Typography
            variant="h2"
            fontWeight="bold"
            color={colors.grey[100]}
            sx={{ fontSize: "42px" }}
          >
            Total Funds
          </Typography>

          <Typography
            variant="h1"
            fontWeight="bold"
            color={colors.greenAccent[500]}
            sx={{ fontSize: "56px", mt: "10px" }}
          >
            £10,000
          </Typography>

          <Typography
            variant="body2"
            color={colors.grey[600]}
            sx={{ mt: "12px" }}
          >
            As of June 2025 · Includes fundraising & donations
          </Typography>
        </Box>


        {/* Sales Obtained - Top Middle - Wider */}
        <Box
          gridColumn="span 4"
          gridRow="span 1"
          backgroundColor="#FFFFFF"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p="20px"
          borderRadius="8px"
          boxShadow="0px 0px 15px rgba(0, 0, 0, 0.05)"
        >
          <TrendingUpIcon
            sx={{
              color: colors.greenAccent[600],
              fontSize: "36px",
              mb: 1,
            }}
          />

          <Typography
            variant="h4"
            fontWeight="bold"
            color={colors.grey[100]}
          >
            Income in June
          </Typography>

          <Typography
            variant="h2"
            fontWeight="bold"
            color={colors.greenAccent[500]}
            sx={{ fontSize: "38px", mt: "5px" }}
          >
            £300
          </Typography>
        </Box>

        

<Box
  gridColumn="span 4"
  gridRow="span 1"
  backgroundColor={colors.background.paper}
  display="flex"
  flexDirection="column"
  alignItems="center"
  justifyContent="center"
  p="20px"
  borderRadius="8px"
  boxShadow={theme.shadows[1]}
>
  <TrendingDownIcon
    sx={{
      color: colors.redAccent[400], // visually distinct from income
      fontSize: "36px",
      mb: 1,
    }}
  />

  <Typography
    variant="h4"
    fontWeight="bold"
    color={colors.grey[100]}
  >
    Expenses in June
  </Typography>

  <Typography
    variant="h2"
    fontWeight="bold"
    color={colors.redAccent[300]}
    sx={{ fontSize: "38px", mt: "5px" }}
  >
    £180
  </Typography>
</Box>



        {/* Recent Transactions - Right Side - Full Height */}
        <Box
          gridColumn="span 5"
          gridRow="span 4"
          backgroundColor={colors.background.paper}
          overflow="auto"
          boxShadow={theme.shadows[1]}
          sx={{
            gridColumn: '9 / 13',
            gridRow: '1 / 5'
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`1px solid ${colors.grey[200]}`}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockDataTransactions.slice(0, 5).map((transaction) => (
            <Box
              key={transaction.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`1px solid ${colors.grey[200]}`}
              p="15px"
            >
              <Box width="30%">
                <Typography color={colors.grey[700]} variant="body1">
                  {transaction.date}
                </Typography>
              </Box>
              <Box width="50%" px={2}>
                <Typography 
                  color={colors.grey[800]}
                  variant="body1"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {transaction.description}
                </Typography>
              </Box>
              <Box width="20%" textAlign="right">
                <Typography
                  variant="body1"
                  fontWeight="600"
                  color={transaction.isIncome ? colors.greenAccent[500] : colors.redAccent[400]}
                >
                  {transaction.amount}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 2 - Middle Row */}
        {/* Revenue Generated - Left Side - Full Width */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.background.paper}
          boxShadow={theme.shadows[1]}

        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                £59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <BarChart isDashboard={true} />
          </Box>
        </Box>



      </Box>
      
      <TransactionForm 
        open={isAddModalOpen} 
        onClose={handleModalClose} 
        onSave={handleSaveTransaction}
      />
    </Box>
  );
};

export default Dashboard;
