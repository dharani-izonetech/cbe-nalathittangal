import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import SchemeDetails from './pages/SchemeDetails/SchemeDetails';
import CategoryDetails from './pages/CategoryDetails/CategoryDetails';
import DummyPage from './pages/DummyPage/DummyPage';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { LanguageProvider } from './i18n/LanguageContext';
import './index.css';

const GlobalBackground = () => (
  <div className="global-background">
    <div className="global-blob global-blob-1"></div>
    <div className="global-blob global-blob-2"></div>
    <div className="global-blob global-blob-3"></div>
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <GlobalBackground />
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/schemes/:id" element={<SchemeDetails />} />
              <Route path="/category/:categoryId" element={<CategoryDetails />} />
              <Route path="/departments" element={<DummyPage title="Departments" />} />
              <Route path="/beneficiaries" element={<DummyPage title="Beneficiaries" />} />
              <Route path="/statistics" element={<DummyPage title="Statistics Portal" />} />
              <Route path="/about" element={<DummyPage title="About Us" />} />
              <Route path="/contact" element={<DummyPage title="Contact Support" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
