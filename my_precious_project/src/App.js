import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutPage from './Page/AboutPage';
import HomePage from './Page/HomePage';
import ScrollToTop from './ScrollToTop';
import { ThemeProvider } from './contexts/ThemeContext.js';
import { theme } from './Style/theme';
import LoginPage from './Page/LoginPage';
import RequestPage from './Page/RequestPage.js';
import DashboardPage from './Page/DashboardPage.js';
import UserProvider from './contexts/userContext.js';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <UserProvider>
                <Router>
                    <ScrollToTop />
                    <Routes>
                        <Route path="/login/*" element={<LoginPage />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/request" element={<RequestPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                    </Routes>
                </Router>
            </UserProvider>
        </ThemeProvider>
    );
}

export default App;
