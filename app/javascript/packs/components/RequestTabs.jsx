import {
  makeStyles,
  Paper,
  Tabs,
  Tab,
  useMediaQuery,
  SwipeableDrawer,
} from '@material-ui/core';
import { LocalHotel } from '@material-ui/icons';
import React, { useState } from 'react';
import { OxygenSvg, PcrSvg, VentilatorSvg, DoctorHomeSvg, AllRequestIcon } from '../helpers/svgIcons/svgIcons';

const RequestTabs = props => {
  const classes = useStyles();
  const [tabOpen, setTabOpen] = useState(false);
  const mobile = useMediaQuery('(max-width: 600px)')

  const handleChange = (event, newValue) => {
    props.handleTabChange(newValue)
  };

  const toggleDrawer = open => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setTabOpen(open)
  }

  const tabLabel = (label) => {
    return <div style={{paddingLeft: 10}}>{label}</div>
  }

  const SwipableTab = ({ children }) => {
    if (mobile) {
      return (
        <SwipeableDrawer
          anchor='left'
          open={tabOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <Paper className={classes.root}>{children}</Paper>
        </SwipeableDrawer>)
    } else {
      return <Paper className={classes.root}>{children}</Paper>
    }
  }

  return (
    <SwipableTab>
      <Tabs
        className={classes.tabs}
        orientation="vertical"
        value={props.value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab className={classes.tab} value='all' label={tabLabel('All Request')} icon={<AllRequestIcon />} />
        <Tab className={classes.tab} value='Bed' label={tabLabel('Bed')} icon={<LocalHotel />} />
        <Tab className={classes.tab} value='Oxygen' label={tabLabel('Oxygen')} icon={<OxygenSvg />} />
        <Tab className={classes.tab} value='Ventilator' label={tabLabel('Ventilator')} icon={<VentilatorSvg />} />
        <Tab className={classes.tab} value='PCR' label={tabLabel('PCR')} icon={<PcrSvg />} />
        <Tab className={classes.tab} value='Doctor' label={tabLabel('Doctor')} icon={<DoctorHomeSvg />} />
      </Tabs>
    </SwipableTab>
  )
}

const useStyles = makeStyles({
  root: {
    flexShrink: 0,
    width: 160,
  },
  tabs: {
    height: '100%',
    position: 'fixed',
    zIndex: 1200,
    width: 160,
    // "& .MuiTab-wrapper": {
    //   flexDirection: "row",
    //   justifyContent: 'flex-start',
    // }
  },
  tab: {
    fontSize: '0.8rem',
  }
});

export default RequestTabs;
