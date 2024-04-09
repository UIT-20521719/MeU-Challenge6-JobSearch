import Footer from './components/Footer';
import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';
import './scss/index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="app__top">
          <div className="header">
            <div className="header__logo">
              Github <span className="header__logo__span">Jobs</span>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/detail" element={<DetailPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
