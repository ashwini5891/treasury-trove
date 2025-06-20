import { Box, Button, TextField, Typography, useTheme, Link } from "@mui/material";
import { useState } from "react";
import { tokens } from "../../theme";
import { Link as RouterLink } from "react-router-dom";

const ForgotPassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [email, setEmail] = useState("");

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      backgroundColor={colors.primary[500]}
    >
      <Box
        width="100%"
        maxWidth="400px"
        p="32px"
        borderRadius="8px"
        backgroundColor={colors.primary[400]}
        boxShadow="0px 0px 20px rgba(0,0,0,0.2)"
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          color={colors.greenAccent[400]}
          mb="24px"
        >
          Reset Your Password
        </Typography>

        <Typography variant="body2" color={colors.grey[200]} mb="16px">
          Enter your email and we'll send you a link to reset your password.
        </Typography>

        <TextField
          fullWidth
          label="Email"
          variant="filled"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          fullWidth
          sx={{
            mt: 3,
            backgroundColor: colors.greenAccent[600],
            color: colors.grey[900],
            fontWeight: "bold",
            ":hover": {
              backgroundColor: colors.greenAccent[500],
            },
          }}
        >
          Send Reset Link
        </Button>

        <Box textAlign="center" mt={3}>
          <Link
            component={RouterLink}
            to="/login"
            underline="hover"
            color={colors.greenAccent[400]}
            fontSize="14px"
          >
            Back to Login
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
