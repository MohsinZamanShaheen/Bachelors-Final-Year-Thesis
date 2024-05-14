import { useContext } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import TopNavbar from "./Pages/navigation/TopNavbar";
import Sidebar from "./Pages/navigation/Sidebar";
import Dashboard from "./Pages/dashboard";
import Calendar from "./Pages/calender/calender";
import ProfileForm from "./Pages/profileForm";
import FAQ from "./Pages/faq";
import Team from "./Pages/team";
import Invoices from "./Pages/invoices";
import Contacts from "./Pages/contacts";
import Controls from "./Pages/ISOcontrols/iso_27002";
import Requirements from "./Pages/ISOcontrols/iso_2701";
import Profile from "./Pages/Profile/profile";
import LanguageProvider from "./Context/LanguageContext";
import { RowProvider } from "./Context/CheckedRowContext";
import HomePage from "./Pages/Home/home";
import { AuthContext } from "./Context/AuthContext";
import Settings from "./Pages/Settings/settings";
import OrganizationChartCustom from "./Pages/inventory/org_diagram";
import OverviewFlow from "./Pages/inventory/networkdiagram/network_diagram";

function App() {
  const [theme, colorMode] = useMode();
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LanguageProvider>
          <RowProvider>
            {!isLoggedIn ? (
              <Routes>
                <Route path="/" element={<HomePage />} />
              </Routes>
            ) : (
              <div className="app">
                <Sidebar />
                <main className="content">
                  <TopNavbar />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    {/* <Route path="/dashboard2" element={<Dashboard2 />} /> */}
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/newprofile" element={<ProfileForm />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/iso27002" element={<Controls />} />
                    <Route path="/iso2701" element={<Requirements />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/org_diag" element={<OrganizationChartCustom />} />
                    <Route path="/net_diag" element={<OverviewFlow />} />
                  </Routes>
                </main>
              </div>
            )}
          </RowProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
