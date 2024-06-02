import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sales from './pages/sales/Sales';
import Home from './pages/home/Home';
import Kategori from './pages/kategori/Kategori';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container flex-grow-1">
          <Routes>
            <Route path="/sales" element={<Sales />} />
            <Route path="/" element={<Home />} />
            <Route path="/kategori" element={<Kategori />} />
            {/* Tambahkan rute lain di sini jika diperlukan */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
