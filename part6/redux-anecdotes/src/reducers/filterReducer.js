export const filter = (value) => {
  return {
    type: 'FILTER',
    payload: {
      filter: value
    }
  }
}

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.payload.filter
    default:
      return state
  }
}

export default reducer