import {
  makeStyles,
  Paper,
  Tabs,
  Tab
} from '@material-ui/core';
import React from 'react';

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
        <Tab wrapped value='bed' label="Bed" />
        <Tab wrapped value='oxygen' label="Oxygen" />
        <Tab wrapped value='ventilator' label="Ventilator" />
        <Tab wrapped value='pcr' label="PCR" />
        <Tab wrapped value='doctor' label="Doctor At home" />
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
    width: 200
  }
});

export default RequestTabs;
