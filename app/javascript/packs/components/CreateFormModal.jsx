import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import CustomTextField from './CustomTextField';
import CustomSelectPicker from './CustomSelectPicker';

const requestForOptions = [
  { name: 'Bed', value: 'bed' },
  { name: 'Oxygen', value: 'oxygen' },
  { name: 'Ventilator', value: 'ventilator' },
  { name: 'PCR', value: 'pcr' },
  { name: 'Doctor at Home', value: 'doctor' }
]

const genderOptions = [
  { name: 'Male', value: 'male' },
  { name: 'Female', value: 'female' },
  { name: 'Other', value: 'other' }
]

const urgencyOptions = [
  { name: 'Normal', value: 'normal' },
  { name: 'Moderate', value: 'moderate' },
  { name: 'Urgent', value: 'urgent' }
]

const initialState = {
  requestType: '',
  name: '',
  age: '',
  address: '',
  phone: '',
  gender: '',
  urgency: '',
  noOfRequirements: 1,
  additionalInfo: ''
}

const CreateFormModal = props => {
  const [formState, setFormState] = useState(initialState);
  const [isPhoneValid, setIsPhoneValid] = useState(true);


  const invalidPhoneNumber = phone => {
    const regex = /^\+?(?:977)?[ -]?(?:(?:(?:98|97)-?\d{8})|(?:01-?\d{7}))$/
    return phone.match(regex) === null
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (invalidPhoneNumber(formState.phone)) {
      setIsPhoneValid(false)
    } else {
      console.log(formState)
    }
  };

  const handleSelectPickerChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    })
  };

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    if (name === 'phone' && !isPhoneValid && !invalidPhoneNumber(value)) {
      setIsPhoneValid(true)
    }
    setFormState(formState => ({...formState, [name]: value }))
  }

  const renderForm = () => {
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CustomSelectPicker
              label="Request For"
              menuItems={requestForOptions}
              name='requestType'
              defaultValue={formState.requestType}
              handleSelectPickerChange={handleSelectPickerChange}
              helperText='Select what you are looking for'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              type='text'
              required
              name="name"
              label="Name"
              defaultValue={formState.name}
              handleTextChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              type='number'
              required
              name="age"
              label="Age"
              defaultValue={formState.age}
              handleTextChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              type='text'
              required
              name="address"
              label="Address"
              defaultValue={formState.address}
              handleTextChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              type='number'
              required
              name="phone"
              label="Phone No."
              defaultValue={formState.phone}
              handleTextChange={handleTextChange}
              error={!isPhoneValid}
              helperText='Invalid phone number'
            />
            <FormHelperText>9841******</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomSelectPicker
              label="Gender"
              menuItems={genderOptions}
              name='gender'
              fullWidth={true}
              defaultValue={formState.gender}
              handleSelectPickerChange={handleSelectPickerChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomSelectPicker
              label="Urgency"
              menuItems={urgencyOptions}
              name='urgency'
              fullWidth={true}
              defaultValue={formState.urgency}
              handleSelectPickerChange={handleSelectPickerChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              type='number'
              required
              name="noOfRequirements"
              label="No. of Requirements"
              defaultValue={formState.noOfRequirements}
              handleTextChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              type='text'
              name="additionalInfo"
              label="Additional Information(Optional)"
              defaultValue={formState.additionalInfo}
              handleTextChange={handleTextChange}
              multiline
            />
          </Grid>
        </Grid>
      </>
    )
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Request for</DialogTitle>
      <form name="form" onSubmit={handleSubmit} style={{ width: '100%' }}>
        <DialogContent>
          {renderForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button type='submit' color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CreateFormModal;