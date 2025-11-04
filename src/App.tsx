import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HotelPage } from './pages/HotelPage';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-container">
        <HotelPage />
      </div>
      <Footer />
    </div>
  );
}

export default App;


