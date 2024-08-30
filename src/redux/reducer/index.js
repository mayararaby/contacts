import * as actionTypes from "../../constants/actions"

const initialState = {
  contacts: [],
  filteredContacts:{},
}

export const contactsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_NEW_CONTACTS:
      return {
        ...state,
        contacts: payload
      }

      case actionTypes.SET_FILTER_CONTACTS:
        return {
          ...state,
          filteredContacts: payload
        }

    default:
      return state
  }
}
