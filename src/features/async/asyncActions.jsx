import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from './asyncConstants';

const asyncActionStart = () => {
  return {
    type: ASYN_ACTION_START
  }
}

const asyncActionFinish = () => {
  return {
    type: ASYNC_ACTION_FINISH
  }
}

const asyncActionError = () => {
  return {
    type: ASYNC_ACTION_ERROR
  }
}