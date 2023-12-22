import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutPage from "./Page/AboutPage";
import HomePage from "./Page/HomePage";
import ScrollToTop from "./ScrollToTop";
import { ThemeProvider } from "./contexts/ThemeContext.js";
import { theme } from "./Style/theme";
import FirebaseContainer from "./Page/loginfeat.js";
import LoginPage from "./Page/LoginPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* 기본 화면 설정 */}
          <Route path="/phone" element={<FirebaseContainer />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
