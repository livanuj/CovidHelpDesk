import React from 'react';
import { AppBar, CssBaseline, StylesProvider, Toolbar, Typography } from '@material-ui/core'

const AppLayout = ({ children }) => {
  return (
    <StylesProvider injectFirst>
      <CssBaseline />
      <AppBar>
        <Toolbar style={styles.toolbar}>
          <Typography variant='h6'> Covid Help </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </StylesProvider>
  )
}

const styles = {
  toolbar: {
    minHeight: 80,
    display: "flex",
    justifyContent: "space-between",
  },
};

export default AppLayout;
