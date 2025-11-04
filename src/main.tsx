import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HotelProvider } from './context/hotel/HotelContext';
import { RoomsListProvider } from './context/roomsList/RoomsListContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HotelProvider>
      <RoomsListProvider>
        <App />
      </RoomsListProvider>
    </HotelProvider>
  </React.StrictMode>,
);


