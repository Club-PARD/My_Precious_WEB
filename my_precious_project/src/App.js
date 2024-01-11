import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutPage from './Page/AboutPage';
import HomePage from './Page/HomePage';
import ScrollToTop from './ScrollToTop';
import { ThemeProvider } from './contexts/ThemeContext.js';
import { theme } from './Style/theme';
import LoginPage from './Page/LoginPage';
import RequestPage from './Page/RequestPage.js';
import DashboardPage from './Page/DashboardPage.js';
import RequestDetailPage from './Page/RequestDetailPage.js';
import { RecoilRoot } from 'recoil';
import { UserProvider } from './contexts/userContext.js';
import ManagePage from './Page/ManagePage.js';
import AnimatedCursor from './AnimatedCursor.js';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <RecoilRoot>
                <UserProvider>
                    <Router>
                        <ScrollToTop />
                        <AnimatedCursor />
                        <Routes>
                            <Route path="/login/*" element={<LoginPage />} />
                            <Route path="/" element={<HomePage />} />
                            <Route path="/request" element={<RequestPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/request-detail/:board_id" element={<RequestDetailPage />} />
                            <Route path="/manage-request/:board_id" element={<ManagePage />} />
                        </Routes>
                    </Router>
                </UserProvider>
            </RecoilRoot>
        </ThemeProvider>
    );
}

export default App;
