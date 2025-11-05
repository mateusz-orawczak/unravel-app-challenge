import { HotelAction, HotelActionTypes } from './hotelActionTypes';
import { HotelDetails } from '../../api/hotel/types';

export interface HotelState {
  hotel: HotelDetails | null
}

export const initialHotelState: HotelState = {
  hotel: null,
};

export function hotelReducer(state: HotelState, action: HotelAction): HotelState {
  switch (action.type) {
    case HotelActionTypes.SET_HOTEL:
      return {
        ...state,
        hotel: action.payload
      };

    default:
      return state;
  }
}
