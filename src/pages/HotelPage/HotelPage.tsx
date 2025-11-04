import { useEffect, useState } from 'react';
import { fetchHotelData as apiFetchHotelData } from '../../api/hotel/hotelApi';
import { useHotel } from '../../context/hotel/HotelContext';
import { useRoomsList } from '../../context/roomsList/RoomsListContext';
import { HotelActionTypes } from '../../context/hotel/hotelActionTypes';
import { RoomsListActionTypes } from '../../context/roomsList/roomsListActionTypes';
import { HotelDetails } from './components/HotelDetails';
import { RoomsList } from './components/RoomsList';
import './HotelPage.css';

function HotelPage() {
  const { hotel, dispatch: hotelDispatch } = useHotel();
  const { dispatch: roomsDispatch } = useRoomsList();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    if (hotel) {
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(null);

      try {
        const data = await apiFetchHotelData();
        
        hotelDispatch({
          type: HotelActionTypes.SET_HOTEL,
          payload: data.hotel_details,
        });

        if (data.rooms_by_serial_no?.[0]?.rooms) {
          roomsDispatch({
            type: RoomsListActionTypes.SET_ROOMS,
            payload: data.rooms_by_serial_no[0].rooms,
          });
        }

        setIsLoading(false);
      } catch (error: any) {
        setIsError(error.message || 'An error occurred while loading hotel data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [hotel, hotelDispatch, roomsDispatch]);

  if (isLoading) {
    return <div className="hotel-page-loading">Loading hotel information...</div>;
  }

  if (isError) {
    return <div className="hotel-page-error">Error: {isError}</div>;
  }

  return (
    <div className="hotel-page">
      <HotelDetails />
      <RoomsList />
    </div>
  );
}

export default HotelPage;

