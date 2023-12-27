import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutPage from './Page/AboutPage';
import HomePage from './Page/HomePage';
import ScrollToTop from './ScrollToTop';
import { ThemeProvider } from './contexts/ThemeContext.js';
import { theme } from './Style/theme';
import LoginPage from './Page/LoginPage';
import RequestPage from './Page/RequestPage.js';
import DashboardPage from './Page/DashboardPage.js';
import styled, { createGlobalStyle } from 'styled-components';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
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
        </ThemeProvider>
    );
}

const GlobalStyle = createGlobalStyle`
body {
    max-width: 100vw;
    background-color: #FAFAFA;
}
body::-webkit-scrollbar {
    display: none;
}
`;

export default App;
