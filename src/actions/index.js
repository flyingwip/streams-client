import streams from '../apis/streams'
import history from '../history'
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from './types'

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  }
}
export const signOut = () => {
  return {
    type: SIGN_OUT,
  }
}

// Action creater for creating a stream

// this action creator is going to be called from the create stream form
// and the formvalues as an argument
// this is an asynchronous action creater (api call)
// in that case use redux-thunk
// so return an arrow function and the first argument is the dispacht function
export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth
  const response = await streams.post('/streams', { ...formValues, userId })

  dispatch({ type: CREATE_STREAM, payload: response.data })

  // Do some programmatic navigation to
  // get the user back to the root route
  history.push('/')
}

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get('/streams')

  dispatch({ type: FETCH_STREAMS, payload: response.data })
}

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`)

  dispatch({ type: FETCH_STREAM, payload: response.data })
}

export const updateStream = (id, formValues) => async (dispatch) => {
  const response = await streams.patch(`/streams/${id}`, formValues)

  dispatch({ type: EDIT_STREAM, payload: response.data })
  history.push('/')
}

export const deleteStream = (id) => async (dispatch) => {
  await streams.put(`/delete/${id}`)

  dispatch({ type: DELETE_STREAM, payload: id })
}
