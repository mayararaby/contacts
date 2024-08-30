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



export const FiltersOptions = ({ setOpenFilters, openFilter }) => {
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
  const handleInputChange = (e) => {
    const { name, value } = e.target
    const newValue = { ...inputValue }
    jp.value(newValue, `$..${name}`, value);
    setValue(newValue)
  }

  const genderOptions =  [{ title: "Male", name: "male", value: inputValue.gender },
    { title: "Female", name: "female", value: inputValue.gender }]
  const titleOptions = [
    { title: "Mr", name: "name.title", value: inputValue.name.title },
    { title: "Mrs", name: "name.title", value: inputValue.name.title },
    { title: "Ms", name: "name.title", value: inputValue.name.title },
    { title: "Miss", name: "name.title", value: inputValue.name.title }]

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
          <RadioField options={titleOptions} label="Title" />
          <InputField type={"text"} label={"First Name"} value={inputValue.name.first} name={"name.first"} handleInputChange={handleInputChange} />
          <InputField type={"text"} label={"Last Name"} value={inputValue.name.last} name={"name.last"} handleInputChange={handleInputChange} />
          <RadioField options={genderOptions} label="Gender" />
          <InputField type={"text"} label={"Email"} value={inputValue.email} name={"email"} handleInputChange={handleInputChange} />
          <InputField type={"text"} label={"Phone"} value={inputValue.phone} name={"phone"} handleInputChange={handleInputChange} />
          <InputField type={"text"} label={"Street Number"} value={inputValue.location.street.number} name={"location.street.number"} handleInputChange={handleInputChange} />
          <InputField type={"text"} label={"Street Name"} value={inputValue.location.street.name} name={"location.street.name"} handleInputChange={handleInputChange} />
          <InputField type={"text"} label={"City"} value={inputValue.location.city} name={"location.city"} handleInputChange={handleInputChange} />
          <InputField type={"text"} label={"State"} value={inputValue.location.state} name={"location.state"} handleInputChange={handleInputChange} />
          <InputField type={"text"} label={"Country"} value={inputValue.location.country} name={"location.country"} handleInputChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpenFilters(false)}>
            Apply Filters
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}