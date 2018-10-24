import { toastr } from 'react-redux-toastr'
import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENTS } from './eventConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { fetchSampleData } from '../../app/data/mockAPI';


export const fetchEvents = (events) => {
  return {
    type: FETCH_EVENTS,
    payload: events
  }
}

/**
 * Creates a new event.
 * @param {Object} newEvent - Event object holding information about the event.
 * @param {string} newEvent.id - The id of the event.
 * @param {string} newEvent.title - The title of the event.
 * @param {string} newEvent.date - The date of the event.
 * @param {string} newEvent.hostPhotoURL - The photo of the Host that posted the event.
 * @param {string} newEvent.city - The city of the event.
 * @param {string} newEvent.venue - The venue of the event.
 * @param {string} newEvent.hostedBy - Who will be hosting this event.
 */
export const createEvent = (event) => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_EVENT,
        payload: {
          event
        }
      });
      toastr.success('Success!', 'Event has been created!');
    } catch(error) {
      toastr.error('Oops!', 'Something went wrong');
    }
  }
}

/**
 * Updates an existing event
 * @param {Object} updatedEvent - Updated event object
 */
export const updateEvent = (event) => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: {
          event
        }
      });
      toastr.success('Success!', 'Event has been updated!');
    } catch(error) {
      toastr.error('Oops!', 'Something went wrong');
    }
  }
}

/**
 * Deletes an event
 * @param {string} eventId - The Id of a current event 
 */ 
export const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId
    }
  }
}

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      let events = await fetchSampleData();
      dispatch(fetchEvents(events));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  }
}