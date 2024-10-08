import { useContext, useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";
import TopNavbar from "./Pages/navigation/TopNavbar";
import Sidebar from "./Pages/navigation/Sidebar";
import Dashboard from "./Pages/dashboard";
import Calendar from "./Pages/calender/calender";
import CreateUserForm from "./Pages/profileForm";
import FAQ from "./Pages/faq";
import Team from "./Pages/team";
import Invoices from "./Pages/invoices";
import Providers from "./Pages/providers";
import Controls from "./Pages/ISOcontrols/iso_27002";
import Requirements from "./Pages/ISOcontrols/iso_2701";
import Profile from "./Pages/Profile/profile";
import LanguageProvider from "./Context/LanguageContext";
import HomePage from "./Pages/Home/home";
import { AuthContext } from "./Context/AuthContext";
import Settings from "./Pages/Settings/settings";
import OrganizationChartCustom from "./Pages/inventory/org_diagram";
import OverviewFlow from "./Pages/inventory/networkdiagram/network_diagram";
import AlertTable from "./Pages/Alerts";
import {CompanyProvider} from "./Context/CompanyContext";
import PrivateRoute from "./security/PrivateRoute";

function App() {
  const [theme, colorMode] = useMode();
  const { isLoggedIn } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LanguageProvider>
          <CompanyProvider>
            {!isLoggedIn ?
                (
                    <Routes>
                      <Route path="/" element={<HomePage  />} />
                      <Route path="/authenticate" element={<HomePage showLogin={true} />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                ) : (
                    <div className="app">
                      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                      <main className="content">
                        <TopNavbar handleDrawerToggle={handleDrawerToggle} />
                        <Routes>
                          <Route path="/" element={<Navigate to="/dashboard" replace />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/calendar" element={<Calendar />} />
                          <Route element={<PrivateRoute role="ADMIN" />}>
                            <Route path="/newprofile" element={<CreateUserForm />} />
                          </Route>
                          <Route path="/faq" element={<FAQ />} />
                          <Route path="/providers" element={<Providers />} />
                          <Route path="/invoices" element={<Invoices />} />
                          <Route path="/team" element={<Team />} />
                          <Route path="/iso27002" element={<Controls />} />
                          <Route path="/iso27001" element={<Requirements />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/settings" element={<Settings />} />
                          <Route path="/org_diag" element={<OrganizationChartCustom />} />
                          <Route path="/net_diag" element={<OverviewFlow />} />
                          <Route path="/detailedAlerts" element={<AlertTable />} />
                        </Routes>
                      </main>
                    </div>
                )}
          </CompanyProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
