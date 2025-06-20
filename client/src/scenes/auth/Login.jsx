import { Box, Button, TextField, Typography, useTheme, Link } from "@mui/material";
import { useState } from "react";
import { tokens } from "../../theme";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          variant="h3"
          textAlign="center"
          fontWeight="bold"
          color={colors.greenAccent[400]}
          mb="24px"
        >
          Treasury Trove
        </Typography>

        <TextField
          fullWidth
          label="Email"
          variant="filled"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="filled"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Box textAlign="right" mt={1}>
          <Link
            component={RouterLink}
            to="/forgot-password"
            underline="hover"
            color={colors.greenAccent[400]}
            fontSize="14px"
          >
            Forgot Password?
          </Link>
        </Box>

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
          Log In
        </Button>

        <Box textAlign="center" mt={3}>
          <Typography variant="body2" color={colors.grey[200]}>
            Don't have an account?{" "}
            <Link
              component={RouterLink}
              to="/register"
              underline="hover"
              color={colors.greenAccent[400]}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
