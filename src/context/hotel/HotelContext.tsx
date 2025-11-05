import { createContext, useContext, useReducer } from 'react';
import { ContextDevTool } from 'react-context-devtool';
import { hotelReducer, initialHotelState } from './hotelReducer';
import { HotelDetails } from '../../api/hotel/types';
import { HotelAction } from './hotelActionTypes';

const HotelContext = createContext<{
  hotel: HotelDetails | null
  dispatch: React.Dispatch<HotelAction>
} | null>(null);

export function HotelProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(hotelReducer, initialHotelState);

  const value = {
    ...state,
    dispatch,
  };

  return (
    <HotelContext.Provider value={value}>
      {process.env.NODE_ENV === 'development' && (
        <ContextDevTool 
          context={HotelContext} 
          id="hotel-context" 
          displayName="Hotel Context" 
        />
      )}
      {children}
    </HotelContext.Provider>
  );
}

export function useHotel() {
  const context = useContext(HotelContext);
  
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  
  return context;
}
