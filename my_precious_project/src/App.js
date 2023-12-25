<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutPage from "./Page/AboutPage";
import HomePage from "./Page/HomePage";
import ScrollToTop from "./ScrollToTop";
import { ThemeProvider } from "./contexts/ThemeContext.js";
import { theme } from "./Style/theme";
import FirebaseContainer from "./Page/loginfeat.js";
import LoginPage1 from "./Page/LoginPage1";
import LoginPage2 from "./Page/LoginPage2.js";
import LoginPage3 from "./Page/LoginPage3.js";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* 기본 화면 설정 */}
          <Route path="/phone" element={<FirebaseContainer />} />
          <Route path="/login1" element={<LoginPage1 />} />
          <Route path="/login2" element={<LoginPage2 />} />
          <Route path="/login3" element={<LoginPage3 />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutPage from './Page/AboutPage';
import HomePage from './Page/HomePage';
import ScrollToTop from './ScrollToTop';
import { ThemeProvider } from './contexts/ThemeContext.js';
import { theme } from './Style/theme';
import FirebaseContainer from './Page/loginfeat.js';
import LoginPage from './Page/LoginPage';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <ScrollToTop />
                <Routes>
                    {/* 기본 화면 설정 */}
                    <Route path="/phone" element={<FirebaseContainer />} />
                    <Route path="/login/*" element={<LoginPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
>>>>>>> main
}

export default App;
