import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Transactions from "./scenes/transactions";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider, useTheme } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Footer from "./scenes/global/Footer";
import Login from "./scenes/auth/Login";
import ForgotPassword from "./scenes/auth/ForgotPassword";
import ResetPassword from "./scenes/auth/ResetPassword";
import Register from "./scenes/auth/Register";
import CheckEmail from "./scenes/auth/CheckEmail";
import VerifyEmail from "./scenes/auth/VerifyEmail";

function AppContent() {
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const theme = useTheme();
  const isAuthPage = [
    '/login',
    '/forgot-password',
    '/reset-password',
    '/register',
    '/check-email',
    '/verify-email'
  ].some(path => location.pathname.startsWith(path));

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
      </Routes>
    );
  }


  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <div style={{ display: 'flex', flex: 1, backgroundColor: theme.palette.background.default }}>
        <Sidebar isSidebar={isSidebar} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: theme.palette.background.default }}>
          <Topbar setIsSidebar={setIsSidebar} />
          <main className="content" style={{ flex: 1, backgroundColor: theme.palette.background.default, padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
