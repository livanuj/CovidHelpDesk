import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@material-ui/core";
import { OutlinedColorButton } from "../customStyle";

const RequestInfoModal = props => {

  const renderRequestInfo = (request) => {
    return (
      <div key={request.id}>
        <div>
          <b>{request.name}</b>
        </div>
        <div>
          {request.address} - {request.wardNo}
        </div>
        <div>
          {request.phone}
        </div>
        <div>
          Requested <b>{request.requestType}</b>
        </div>
        <div>
          Requirements - {request.noOfRequirements}
        </div>
        { request.preExistingDiseases ? <div>
            <b>Patient has following Pre Existing Diseases</b>
            <br />
            {request.preExistingDiseases}
            </div>
          : null
        }
        { request.additionalInfo ? <div>
            <b>Additional Information from Patient</b>
            <br />
            {request.additionalInfo}
            </div>
          : null
        }
        <Divider />
        <br />
      </div>
    )
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-disclaimer"
    >
      <DialogTitle id="form-dialog-title">Request Detail</DialogTitle>
      <DialogContent>
        <h3> You can contact the following person </h3>
        <div>
          {props.requestDetail.map(request => renderRequestInfo(request))}
        </div>
      </DialogContent>
      <DialogActions>
        <OutlinedColorButton onClick={props.handleClose} color="default">
          Done
        </OutlinedColorButton>
      </DialogActions>
    </Dialog>
  )
}

export default RequestInfoModal;
