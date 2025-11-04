import { createContext, useContext, useReducer } from 'react';
import { ContextDevTool } from 'react-context-devtool';
import { roomsListReducer, initialRoomsListState } from './roomsListReducer';
import { RoomsListActionTypes } from './roomsListActionTypes';

const RoomsListContext = createContext<{
  allRooms: any[]
  roomsList: any[]
  isLoading: boolean
  loadNextPage: () => void
  dispatch: React.Dispatch<any>
} | null>(null);

export function RoomsListProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(roomsListReducer, initialRoomsListState);

  const loadNextPage = () => {
    dispatch({
      type: RoomsListActionTypes.SET_LOADING,
      payload: true,
    });

    // Using setTimeout to simulate network delay and showing loading indicator,
    // 2 seconds should be enough for demo purposes here
    setTimeout(() => {
      dispatch({
        type: RoomsListActionTypes.LOAD_NEXT_PAGE,
      });
    }, 2000);
  };

  const value = {
    allRooms: state.allRooms,
    roomsList: state.roomsList,
    isLoading: state.isLoading,
    loadNextPage,
    dispatch,
  };

  return (
    <RoomsListContext.Provider value={value}>
      {process.env.NODE_ENV === 'development' && (
        <ContextDevTool 
          context={RoomsListContext} 
          id="rooms-list-context" 
          displayName="Rooms List Context" 
        />
      )}
      {children}
    </RoomsListContext.Provider>
  );
}

export function useRoomsList() {
  const context = useContext(RoomsListContext);
  
  if (!context) {
    throw new Error('useRoomsList must be used within a RoomsListProvider');
  }
  
  return context;
}

