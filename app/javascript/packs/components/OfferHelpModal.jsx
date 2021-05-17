import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid
} from '@material-ui/core';
import { useToasts } from 'react-toast-notifications'
import CustomTextField from './CustomTextField';
import { useMutation, useQueryClient } from 'react-query';
import { postFetch } from '../helpers/fetchApi';
import { ColorButton, OutlinedColorButton } from '../customStyle';

const initialState = {
  name: '',
  address: '',
  phone: '',
  additionalInfo: ''
}

const postHelpRequest = async (body) => {
  let request = {
    url: '/api/v1/requests/help_request',
    body
  }
  const { response, error } = await postFetch(request)
  if (error) {
    throw new Error(error)
  }
  return response.body
}

const OfferHelpModal = props => {
  const queryClient = useQueryClient();
  const { addToast } = useToasts();
  const [formState, setFormState] = useState(initialState);
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  const { mutateAsync } = useMutation(
    () => postHelpRequest({
      helper: formState,
      requestIds: props.selectedItems.map((item) => item.id)
    }), {
      onSuccess: (res) => {
        queryClient.invalidateQueries('requests')
        addToast(res.message, { appearance: 'success', autoDismiss: true })
      },
      onError: (err) => addToast(err.message, { appearance: 'error', autoDismiss: true })
    }
  )

  const invalidPhoneNumber = phone => {
    const regex = /^\+?(?:977)?[ -]?(?:(?:(?:98|97)-?\d{8})|(?:01-?\d{7}))$/
    return phone.match(regex) === null
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (invalidPhoneNumber(formState.phone)) {
      setIsPhoneValid(false)
    } else {
      props.handleClose()
      mutateAsync()
    }
  }

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
            <CustomTextField
              type='text'
              required
              name="name"
              label="Name"
              defaultValue={formState.name}
              handleTextChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12}>
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
      <DialogTitle id="form-dialog-title">Offer Help</DialogTitle>
      <form name="form" onSubmit={handleSubmit}>
        <DialogContent>
          {renderForm()}
        </DialogContent>
        <DialogActions>
          <OutlinedColorButton onClick={props.handleClose}>
            Cancel
          </OutlinedColorButton>
          <ColorButton type='submit' variant="contained">
            Submit
          </ColorButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default OfferHelpModal;