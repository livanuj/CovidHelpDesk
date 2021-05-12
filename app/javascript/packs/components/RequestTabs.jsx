import {
  makeStyles,
  Paper,
  Tabs,
  Tab
} from '@material-ui/core';
import React from 'react';

const RequestTabs = props => {
  const classes = useStyles();
  // const [value, setValue] = React.useState('all');

  const handleChange = (event, newValue) => {
    // setValue(newValue);
    props.handleTabChange(newValue)
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={props.value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab value='all' label="All" />
        <Tab value='bed' label="Bed" />
        <Tab value='oxygen' label="Oxygen" />
        <Tab value='ventilator' label="Ventilator" />
        <Tab value='pcr' label="PCR" />
        <Tab value='doctor' label="Doctor At home" />
      </Tabs>
    </Paper>
  )
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default RequestTabs;
