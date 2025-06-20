import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      p="20px"
      textAlign="center"
      backgroundColor={colors.primary[800]}
      color={colors.grey[100]}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Treasury Trove. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
