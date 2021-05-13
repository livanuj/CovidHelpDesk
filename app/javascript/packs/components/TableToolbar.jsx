import React from 'react'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import { Button } from '@material-ui/core'
import { LocalHospitalRounded } from '@material-ui/icons'

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
    bulkHelpHandler,
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
        <Tooltip style={{width: 185}}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<LocalHospitalRounded />}
            onClick={bulkHelpHandler}
          >
            Help Them
          </Button>
        </Tooltip>
      ) : null }
    </Toolbar>
  )
}

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  bulkHelpHandler: PropTypes.func.isRequired,
}

export default TableToolbar
