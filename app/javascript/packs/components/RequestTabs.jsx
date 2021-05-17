import {
  makeStyles,
  Paper,
  useMediaQuery,
  IconButton,
  Drawer,
} from '@material-ui/core';
import { LocalHotel } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { AntTabs, AntTab } from '../customStyle';
import { OxygenSvg, PcrSvg, VentilatorSvg, DoctorHomeSvg, AllRequestIcon } from '../helpers/svgIcons/svgIcons';

const RequestTabs = props => {
  const classes = useStyles();
  const [tabOpen, setTabOpen] = useState(false);
  const mobile = useMediaQuery('(max-width: 600px)')

  const handleChange = (event, newValue) => {
    props.handleTabChange(newValue)
  };

  const toggleDrawer = open => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
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
        <Drawer
          anchor='left'
          open={tabOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <Paper className={classes.root}>{children}</Paper>
        </Drawer>)
    } else {
      return <Paper className={classes.root}>{children}</Paper>
    }
  }

  return (
    <>
      {
        mobile ? 
          <IconButton
            style={{position: 'fixed', zIndex: 110}}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        : null
      }
      <SwipableTab>
        <AntTabs
          className={classes.tabs}
          orientation="vertical"
          value={props.value}
          onChange={handleChange}
        >
          <AntTab className={classes.tab} value='all' label={tabLabel('All Request')} icon={<AllRequestIcon />} />
          <AntTab className={classes.tab} value='Bed' label={tabLabel('Bed')} icon={<LocalHotel />} />
          <AntTab className={classes.tab} value='Oxygen' label={tabLabel('Oxygen')} icon={<OxygenSvg />} />
          <AntTab className={classes.tab} value='Ventilator' label={tabLabel('Ventilator')} icon={<VentilatorSvg />} />
          <AntTab className={classes.tab} value='PCR' label={tabLabel('PCR')} icon={<PcrSvg />} />
          <AntTab className={classes.tab} value='Doctor' label={tabLabel('Doctor')} icon={<DoctorHomeSvg />} />
        </AntTabs>
      </SwipableTab>
    </>
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
    zIndex: 100,
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
