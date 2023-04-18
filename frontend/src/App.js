import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Motivation from './pages/motivation/Motivation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' exact element={<Motivation />} />
          <Route path='/' element={<></>} />
          <Route path='/' element={<></>} />
          <Route path='/' element={<></>} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
