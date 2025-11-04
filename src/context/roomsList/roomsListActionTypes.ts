export const RoomsListActionTypes = {
  SET_ROOMS: 'ROOMS_SET_ROOMS',
  LOAD_NEXT_PAGE: 'ROOMS_LOAD_NEXT_PAGE',
  SET_LOADING: 'ROOMS_SET_LOADING',
} as const;

export type RoomsSetAction = {
  type: typeof RoomsListActionTypes.SET_ROOMS
  payload: any[]
}

export type RoomsLoadNextPageAction = {
  type: typeof RoomsListActionTypes.LOAD_NEXT_PAGE
}

export type RoomsSetLoadingAction = {
  type: typeof RoomsListActionTypes.SET_LOADING
  payload: boolean
}

export type RoomsListAction =
  | RoomsSetAction
  | RoomsLoadNextPageAction
  | RoomsSetLoadingAction

