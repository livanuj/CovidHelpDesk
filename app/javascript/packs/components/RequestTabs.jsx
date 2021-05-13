import {
  makeStyles,
  Paper,
  Tabs,
  Tab,
} from '@material-ui/core';
import { LocalHotel } from '@material-ui/icons';
import React from 'react';
import { OxygenSvg, PcrSvg, VentilatorSvg, DoctorHomeSvg } from '../helpers/svgIcons/svgIcons';

const RequestTabs = props => {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    props.handleTabChange(newValue)
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        className={classes.tabs}
        orientation="vertical"
        value={props.value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab wrapped value='all' label="All Requests" />
        <Tab wrapped value='bed' label="Bed" icon={<LocalHotel />} />
        <Tab wrapped value='oxygen' label="Oxygen" icon={<OxygenSvg />} />
        <Tab wrapped value='ventilator' label="Ventilator" icon={<VentilatorSvg />} />
        <Tab wrapped value='pcr' label="PCR" icon={<PcrSvg />} />
        <Tab wrapped value='doctor' label="Doctor" icon={<DoctorHomeSvg />} />
      </Tabs>
    </Paper>
  )
}

const useStyles = makeStyles({
  root: {
    flexShrink: 0,
    width: 200
  },
  tabs: {
    height: '100%',
    position: 'fixed',
    zIndex: 1200,
    width: 200,
    "& .MuiTab-wrapper": {
      flexDirection: "row",
      "& .MuiSvgIcon-root": {
        paddingRight: 5
      }
    }
  },
});

export default RequestTabs;
