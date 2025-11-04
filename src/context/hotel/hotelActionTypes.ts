export const HotelActionTypes = {
  SET_HOTEL: 'HOTEL_SET_HOTEL',
} as const;

export type HotelSetAction = {
  type: typeof HotelActionTypes.SET_HOTEL
  payload: any
}

export type HotelAction = HotelSetAction

