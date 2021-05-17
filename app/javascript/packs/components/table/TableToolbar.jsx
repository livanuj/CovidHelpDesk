import React from 'react'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { LocalHospitalRounded } from '@material-ui/icons'

import GlobalFilter from './GlobalFilter'
import { OutlinedColorButton } from '../../customStyle'

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(1),
    minHeight: 45
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: "#c55c51",
        }
      : {
          color: "#c55c51",
        },
  title: {
    flex: '1 1 100%',
    color: "#c55c51"
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
        <GlobalFilter
          preGlobalFilteredRows={props.preGlobalFilteredRows}
          globalFilter={props.globalFilter}
          setGlobalFilter={props.setGlobalFilter}
        />
      )}

      {numSelected > 0 ? (
        <OutlinedColorButton
          style={{minWidth: 162}}
          variant="outlined"
          startIcon={<LocalHospitalRounded />}
          onClick={bulkHelpHandler}
        >
          Help Them
        </OutlinedColorButton>
      ) : null }
    </Toolbar>
  )
}

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  bulkHelpHandler: PropTypes.func.isRequired,
}

export default TableToolbar
