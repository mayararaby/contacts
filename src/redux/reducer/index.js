

const initialState = {
  contacts: []
}

export const contactsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ActionType":
      return {
        ...state,
        contacts:payload
      }


    default:
      return state
  }
}
