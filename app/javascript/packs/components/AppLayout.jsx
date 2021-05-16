import React from 'react';
import { AppBar, Button, Container, StylesProvider, SvgIcon, Toolbar, Typography } from '@material-ui/core'
import CreateFormModal from './CreateFormModal';
import { AmbulanceSvg } from '../helpers/svgIcons/svgIcons';

const AppLayout = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StylesProvider injectFirst>
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar style={styles.toolbar}>
            <Typography variant='h6'> Covid Help </Typography>
            <Button
              style={{minWidth: 188}}
              variant="contained"
              color="default"
              startIcon={<AmbulanceSvg />}
              onClick={handleClickOpen}
            >
              Add Request
            </Button>
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
