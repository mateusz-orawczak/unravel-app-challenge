import { HotelAction, HotelActionTypes } from './hotelActionTypes';

export interface HotelState {
  hotel: any | null
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
