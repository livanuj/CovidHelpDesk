import React from 'react';
import { AppBar, Button, Container, CssBaseline, StylesProvider, Toolbar, Typography } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons';
import CreateFormModal from './CreateFormModal';

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
              variant="contained"
              color="default"
              startIcon={<CloudUpload />}
              onClick={handleClickOpen}
            >
              Create Request
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
