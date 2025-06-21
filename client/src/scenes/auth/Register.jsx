import { Box, Button, TextField, Typography, useTheme, Link, LinearProgress } from "@mui/material";
import { useState } from "react";
import { tokens } from "../../theme";
import { Link as RouterLink } from "react-router-dom";

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [groupName, setGroupName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Calculate password strength
  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return (strength / 5) * 100;
  };

  const passwordStrength = getPasswordStrength();

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
          Create Your Account
        </Typography>

        <TextField
          fullWidth
          label="Group Name"
          variant="filled"
          margin="normal"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />

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

        {/* Password Strength Meter */}
        {password && (
          <Box mt={1} mb={2}>
            <LinearProgress
              variant="determinate"
              value={passwordStrength}
              sx={{
                height: "8px",
                borderRadius: "4px",
                backgroundColor: colors.grey[700],
                "& .MuiLinearProgress-bar": {
                  backgroundColor:
                    passwordStrength > 80
                      ? colors.greenAccent[400]
                      : passwordStrength > 40
                      ? "#FFA726"
                      : "#EF5350",
                },
              }}
            />
            <Typography variant="caption" color={colors.grey[200]}>
              {passwordStrength >= 80
                ? "Strong password"
                : passwordStrength >= 40
                ? "Moderate password"
                : "Weak password"}
            </Typography>
          </Box>
        )}

        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          variant="filled"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          Sign Up
        </Button>

        <Box textAlign="center" mt={3}>
          <Typography variant="body2" color={colors.grey[200]}>
            Already have an account?{" "}
            <Link
              component={RouterLink}
              to="/login"
              underline="hover"
              color={colors.greenAccent[400]}
            >
              Log In
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
