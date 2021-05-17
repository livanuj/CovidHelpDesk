import React from 'react';
import { AppBar, Container, StylesProvider, Toolbar, useMediaQuery } from '@material-ui/core'

import CreateFormModal from './CreateFormModal';
import { AmbulanceSvg } from '../helpers/svgIcons/svgIcons';
import LogoImg from "../../../assets/images/logo.png"
import { ColorButton } from '../customStyle';

const AppLayout = ({ children }) => {
  const mobile = useMediaQuery('(max-width: 600px)')
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StylesProvider injectFirst>
      <AppBar color='inherit' style={{zIndex: 999, backgroundColor: '#f4f5ef'}}>
        <Container maxWidth="lg">
          <Toolbar style={styles.toolbar}>
            <div>
              <img
                src={LogoImg}
                height="60"
                alt="Covid Care Logo"
              />
            </div>
            <ColorButton
              style={{minWidth: mobile ? 100 : 188, borderRadius: 25}}
              variant="contained"
              startIcon={<AmbulanceSvg />}
              onClick={(handleClickOpen)}
            >
              {mobile ? 'Add' : 'Add Request'}
            </ColorButton>
          </Toolbar>
        </Container>
      </AppBar>
      {open ? <CreateFormModal open={open} handleClose={handleClose} /> : null}
      {children}
    </StylesProvider>
  )
}

const styles = {
  toolbar: {
    minHeight: 80,
    display: "flex",
    justifyContent: "space-between",
  }
};

export default AppLayout;
