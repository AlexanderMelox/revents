import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENTS } from './eventConstants';

// Mock data for events
const initialState = [];

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EVENT:
      return [
        ...state, 
        action.payload.event
      ];
    case UPDATE_EVENT: 
      return [
        // returns all elements that is not the updated event
        ...state.filter(event => event.id !== action.payload.event.id),
        // updates the event that matches the event id that needs to be updated
        action.payload.event
      ];
    case DELETE_EVENT:
      return [
        // returns all elements that are not the event deleted
        ...state.filter(event => event.id !== action.payload.eventId)
      ];
    case FETCH_EVENTS:
      return action.payload.events
    default: 
      return state;
  } 
}

export default eventReducer;