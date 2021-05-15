import {
  makeStyles,
  Paper,
  Tabs,
  Tab,
} from '@material-ui/core';
import { LocalHotel } from '@material-ui/icons';
import React from 'react';
import { OxygenSvg, PcrSvg, VentilatorSvg, DoctorHomeSvg, AllRequestIcon } from '../helpers/svgIcons/svgIcons';

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
        <Tab className={classes.tab} value='all' label="All Request" icon={<AllRequestIcon />} />
        <Tab className={classes.tab} value='Bed' label="Bed" icon={<LocalHotel />} />
        <Tab className={classes.tab} value='Oxygen' label="Oxygen" icon={<OxygenSvg />} />
        <Tab className={classes.tab} value='Ventilator' label="Ventilator" icon={<VentilatorSvg />} />
        <Tab className={classes.tab} value='PCR' label="PCR" icon={<PcrSvg />} />
        <Tab className={classes.tab} value='Doctor' label="Doctor" icon={<DoctorHomeSvg />} />
      </Tabs>
    </Paper>
  )
}

const useStyles = makeStyles({
  root: {
    flexShrink: 0,
    width: 200,
  },
  tabs: {
    height: '100%',
    position: 'fixed',
    zIndex: 1200,
    width: 200,
    "& .MuiTab-wrapper": {
      flexDirection: "row",
      justifyContent: 'flex-start',
      "& .MuiSvgIcon-root": {
        paddingRight: 20
      }
    }
  },
  tab: {
    fontSize: '0.8rem',
  }
});

export default RequestTabs;
