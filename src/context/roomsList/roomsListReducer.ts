import { RoomsListAction, RoomsListActionTypes } from './roomsListActionTypes';
import { Room } from '../../api/hotel/types';

const PAGE_SIZE = 10;

export interface RoomsListState {
  allRooms: Room[]
  roomsList: Room[]
  isLoading: boolean
}

export const initialRoomsListState: RoomsListState = {
  allRooms: [],
  roomsList: [],
  isLoading: false,
};

export function roomsListReducer(state: RoomsListState, action: RoomsListAction): RoomsListState {
  switch (action.type) {
    case RoomsListActionTypes.SET_ROOMS:
      return {
        ...state,
        allRooms: action.payload,
        roomsList: action.payload.slice(0, PAGE_SIZE),
        isLoading: false,
      };

    case RoomsListActionTypes.LOAD_NEXT_PAGE:
      const nextPageStart = state.roomsList.length;
      const nextPageEnd = nextPageStart + PAGE_SIZE;
      const nextPageRooms = state.allRooms.slice(nextPageStart, nextPageEnd);
      return {
        ...state,
        roomsList: [...state.roomsList, ...nextPageRooms],
        isLoading: false,
      };

    case RoomsListActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}

