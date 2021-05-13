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
  noOfRequirement: 0,
  additionalInfo: ''
}

const CreateFormModal = props => {
  const classes = useStyles();
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    console.log('***Mounted***')
    return console.log("****Unmounted****")
  }, [])

  const handleSubmit = (event) => {

  };

  const handleSelectPickerChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    })
  };

  const handleTextChange = (event) => {
    // event.preventDefault();
    const { name, value } = event.target;
    setFormState(formState => ({...formState, [name]: value }))
  }

  const CustomTextField = element => {
    const { required, name, label, defaultValue, type } = element
    return (
      <TextField
        type={type}
        required={required}
        id={name}
        name={name}
        label={label}
        onChange={handleTextChange}
        fullWidth
        value={defaultValue}
      />
    )
  }

  const CustomSelectPicker = element => {
    const { menuItems, defaultValue, name, fullWidth, label } = element
    return (
      <FormControl className={classes.formControl} style={fullWidth ? {width: '100%'} : {}}>
        <InputLabel>{label}</InputLabel>
        <Select
          name={name}
          onChange={handleSelectPickerChange}
          value={defaultValue}
        >
        {menuItems.map(({name, value}) => <MenuItem key={value} value={value}>{name}</MenuItem>)}
        </Select>
        <FormHelperText>Select what you are looking for</FormHelperText>
      </FormControl>
    )
  }
  console.log(formState)

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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField type='text' required name="name" label="Name" defaultValue={formState.name} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField type='text' required name="age" label="Age" defaultValue={formState.age} />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField type='text' required name="address" label="Address" defaultValue={formState.address} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField type='text' required name="phone" label="Phone No." defaultValue={formState.phone} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomSelectPicker
              label="Gender"
              menuItems={genderOptions}
              name='gender'
              fullWidth={true}
              defaultValue={formState.gender}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomSelectPicker
              label="Urgency"
              menuItems={urgencyOptions}
              name='urgency'
              fullWidth={true}
              defaultValue={formState.urgency}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField type='number' required name="noOfRequirements" label="No. of Requirements" defaultValue={formState.noOfRequirement} />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField type='text' name="additionalInfo" label="Additional Information(Optional)" defaultValue={formState.additionalInfo} />
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 240,
  },
}));

export default CreateFormModal;