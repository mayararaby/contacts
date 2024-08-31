import { GET_CONTACT_URL } from "../constants/api";
import axios from 'axios';
import { setFilterContacts, setNewContacts } from "../redux/actions";
import { mapResultWithLetters } from "../helpers";
import { v4 as uuidv4 } from 'uuid';

export const fetchContacts = async (dispatch) => {

  try {
    // Make the GET request
    const contacts = await axios.get(GET_CONTACT_URL);

    // Handle the response data
    const data = contacts.data.results.map(contact=>({...contact, uuid: uuidv4(), char:contact.name.first.charAt(0) }))
    dispatch(setNewContacts(data))
    const filteredResult = mapResultWithLetters(data)
    dispatch(setFilterContacts(filteredResult))
    
    return contacts.data;
  } catch (error) {
    // Handle errors
    console.error('Error fetching data:', error);
    throw error; 
  }
}
