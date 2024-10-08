import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { InputField, RadioField } from './field';
import jp from 'jsonpath';
import { setFilter } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { applyContactFilter, getActiveFilterChar, resetObjectValues } from '../../helpers';
import _ from 'lodash';
import { toggleContactFilter, toggleFavoriteFilter } from '../../helpers/characterFilter';
import { Notification } from '../notification/Notification';

/**
 * @description react-material built-in function to overwrite styles 
 */
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),

  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paper': {
    width: '400px',
  },
}));


/**
 * @module Filters
 * @description render simple form to filter uses with it
 * @param {*} param0 
 * @returns {JSX}
 */
export const FiltersOptions = ({ setOpenFilters, openFilter, type, categories }) => {

  const contactFilter = useSelector((state) => state.filter);
  const oldFilteredContacts = useSelector((state) => state.detailedContacts);
  const availableContacts = useSelector((state) => state.contacts);
  const filteredContacts = useSelector((state) => state.filteredContacts);


  const characters = Object.keys(filteredContacts)
  const filteredChar = type === "contactsList" ? "activeListFilter" : "activeFavoriteFilter"
  const [openNotification, setOpenNotification] = useState(false)
  const [notificationOption, setNotificationOption] = useState({})
  const [inputValue, setValue] = useState({
    gender: contactFilter[type]?.gender || '',
    name: {
      title: contactFilter[type]?.name?.title || '',
      first: contactFilter[type]?.name?.first || '',
      last: contactFilter[type]?.name?.last || ''
    },
    location: {
      street: {
        number: contactFilter[type]?.location?.street?.number || '',
        name: contactFilter[type]?.location?.street?.name || ''
      },
      city: contactFilter[type]?.location?.city || '',
      state: contactFilter[type]?.location?.state || '',
      country: contactFilter[type]?.location?.country || '',
    },
    email: contactFilter[type]?.email || '',
    phone: contactFilter[type]?.phone || '',
  })
  const dispatch = useDispatch();


  useEffect(() => {
    /** Get selected char from filters */
    const activeChar = getActiveFilterChar(filteredContacts, filteredChar);
    setValue((prev) => ({ ...prev, char: activeChar }));

  }, [filteredContacts, filteredChar]);



  /**
   * @description set the form values 
   * @param {*} e 
   * @param {*} isSelectField 
   */
  const handleInputChange = (e, isSelectField = false) => {
    const { name, value, type, id } = e.target
    let path, fieldValue;

    /** check if its text or select field to get the path */
    if (type === "text" || isSelectField) {
      path = name
      fieldValue = value
    }
    else {
      path = id
      fieldValue = name
    }

    /** get clone from value and using json path assign the new values */
    const newValue = _.cloneDeep(inputValue);
    jp.value(newValue, `$..${path}`, fieldValue);
    setValue(newValue)
  }

  /**
   * @description save the filters to store based on current page
   */
  const applyFilter = () => {

    dispatch(setFilter({ ...contactFilter, [type]: inputValue }))
    const findData = applyContactFilter(inputValue, availableContacts)
    setOpenFilters(!findData)
    setOpenNotification(true)
    let msg = findData ? `Found ${findData} contacts` : "There is no result"
    setNotificationOption({ type: findData ? "success" : "error", msg })
  }


  /**
   * @description clear all filter
   */

  const resetFilter = () => {
    const oldFilter = _.cloneDeep(contactFilter);
    delete oldFilter[type]; 
    dispatch(setFilter(oldFilter))
    setValue(resetObjectValues(inputValue))
    setOpenFilters(false)
    type === "contactsList" ? toggleContactFilter("", filteredContacts, dispatch) : toggleFavoriteFilter("", filteredContacts, dispatch)
  }

  const genderOptions = [{ title: "Male", name: "gender", inputName: "male", value: inputValue.gender },
  { title: "Female", name: "gender", value: inputValue.gender, inputName: "female" }]


  return (
    <React.Fragment>

      <BootstrapDialog
        onClose={() => setOpenFilters(false)}
        aria-labelledby="customized-dialog-title"
        open={openFilter}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Filters
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenFilters(false)}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <InputField type={"text"} label={"Title"} value={inputValue.name.title} name={"name.title"} handleInputChange={handleInputChange} />
          <InputField type={"text"} label={"First Name"} value={inputValue.name.first} name={"name.first"} handleInputChange={handleInputChange} />
          <InputField type={"text"} label={"Last Name"} value={inputValue.name.last} name={"name.last"} handleInputChange={handleInputChange} />
          <RadioField options={genderOptions} label="Gender" handleInputChange={handleInputChange} />
          <InputField type={"text"} label={"Email"} value={inputValue.email} name={"email"} handleInputChange={handleInputChange} />
          <InputField type={"text"} label={"Phone"} value={inputValue.phone} name={"phone"} handleInputChange={handleInputChange} />
          <InputField type={"text"} label={"Street Number"} value={inputValue.location.street.number} name={"location.street.number"} handleInputChange={handleInputChange} />
          <InputField type={"text"} label={"Street Name"} value={inputValue.location.street.name} name={"location.street.name"} handleInputChange={handleInputChange} />
          <InputField type={"text"} label={"City"} value={inputValue.location.city} name={"location.city"} handleInputChange={handleInputChange} />
          <InputField type={"text"} label={"State"} value={inputValue.location.state} name={"location.state"} handleInputChange={handleInputChange} />
          <InputField type={"text"} label={"Country"} value={inputValue.location.country} name={"location.country"} handleInputChange={handleInputChange} />

          <div className={`form-field`}>
            <label className="input-label">{"Character"}</label>
            <select className="input-field" disabled onChange={(e) => handleInputChange(e, true)} name='char' id="char" value={inputValue.char}>
              <option value="" disabled>Search will appear here</option>
              {characters.map((character, index) => (<option disabled key={index} value={character}>
                {character}
              </option>))}
            </select>
          </div>


        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={resetFilter}>
            Reset Filters
          </Button>
          <Button autoFocus onClick={applyFilter}>
            Apply Filters
          </Button>

        </DialogActions>
      </BootstrapDialog>
      <Notification type={notificationOption.type} open={openNotification} msg={notificationOption.msg} close={setOpenNotification} />
    </React.Fragment>
  );
}