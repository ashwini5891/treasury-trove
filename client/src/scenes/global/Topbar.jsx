import { Typography, Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box m="10px">
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        position="relative"
        width="100%"
      >
        <Typography
          variant="h2"
          color={colors.primary[600]}
          fontWeight="bold"
          sx={{
            fontSize: { xs: '1.8rem', sm: '2.5rem' },
            lineHeight: 1.2,
            textAlign: 'center',
            flexGrow: 1
          }}
        >
          Friends of St Augustus
        </Typography>
        <Box position="absolute" right="0">
          <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
