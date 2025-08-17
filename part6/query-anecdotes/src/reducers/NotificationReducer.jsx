import { createContext, useReducer, useContext } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'REMOVE':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [value, dispatch] = useReducer(reducer, '')

  return (
    <NotificationContext.Provider value={[value, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  return useContext(NotificationContext)[0]
}

export const useNotifcationDispatch = () => {
  return useContext(NotificationContext)[1]
}