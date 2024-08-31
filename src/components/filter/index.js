import React, { useState } from 'react';
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
import { applyContactFilter } from '../../helpers';
import _ from 'lodash';

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



export const FiltersOptions = ({ setOpenFilters, openFilter, type }) => {
  const availableContacts = useSelector((state) => state.contacts);
  const [inputValue, setValue] = useState({
    gender: '',
    name: {
      title: '',
      first: '',
      last: ''
    },
    location: {
      street: {
        number: '',
        name: ''
      },
      city: '',
      state: '',
      country: '',
    },
    email: '',
    phone: ''
  })
  const dispatch = useDispatch();
  const contactFilter = useSelector((state) => state.filter);
  const oldFilteredContacts = useSelector((state) => state.detailedContacts);


  const handleInputChange = (e) => {
    const { name, value, type, id } = e.target
    let path, fieldValue;
    if(type === "text") {
      path = name
      fieldValue = value
    }
    else{
      path = id
      fieldValue = name
    }

    const newValue = _.cloneDeep(inputValue);
    jp.value(newValue, `$..${path}`, fieldValue);
    setValue(newValue)
  }

  console.log({inputValue})
  const applyFilter = () => {
    dispatch(setFilter({...contactFilter,[type]:inputValue}))
    setOpenFilters(false)
    applyContactFilter(inputValue ,availableContacts, type , dispatch , oldFilteredContacts[type] )
  }
  const resetFilter = () => dispatch(setFilter({...contactFilter,[type]:{}}))

  const genderOptions = [{ title: "Male", name: "gender", inputName:"male" ,value: inputValue.gender },
  { title: "Female", name: "gender", value: inputValue.gender, inputName:"female" }]
  const titleOptions = [
    { title: "Mr",  inputName:"mr",name: "name.title", value: inputValue.name.title },
    { title: "Mrs", inputName:"mrs", name: "name.title", value: inputValue.name.title },
    { title: "Ms", inputName:"ms", name: "name.title", value: inputValue.name.title },
    { title: "Miss", inputName:"miss", name: "name.title", value: inputValue.name.title }]

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
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={applyFilter}>
            Apply Filters
          </Button>
          <Button autoFocus onClick={resetFilter}>
            Reset Filters
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}