import React from 'react'

import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import { Button } from '@material-ui/core'

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.main,
        }
      : {
          color: theme.palette.text.primary,
        },
  title: {
    flex: '1 1 100%',
  },
}))

const TableToolbar = props => {
  const classes = useToolbarStyles()
  const {
    numSelected,
    deleteUserHandler,
  } = props
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Requests
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip>
          <Button
            variant="contained"
            color="primary"
            onClick={deleteUserHandler}
          >
            Help
          </Button>
        </Tooltip>
      ) : null }
    </Toolbar>
  )
}

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  deleteUserHandler: PropTypes.func.isRequired,
}

export default TableToolbar
