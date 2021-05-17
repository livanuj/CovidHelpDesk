import { Button, Checkbox, Tab, Tabs, withStyles } from "@material-ui/core";

export const ColorButton = withStyles((theme) => ({
  root: {
    fontSize: 14,
    padding: 8,
    color: '#f4f5ef',
    backgroundColor: '#c55c51',
    '&:hover': {
      backgroundColor: '#c8302a',
    },
  },
}))(Button);

export const OutlinedColorButton = withStyles((theme) => ({
  root: {
    color: '#c55c51',
    '&:hover': {
      backgroundColor: '#f4f5ef',
    },
  },
}))(Button);

export const AntTabs = withStyles({
  indicator: {
    backgroundColor: '#c55c51',
  },
})(Tabs);

export const AntTab = withStyles((theme) => ({
  root: {
    '&:hover': {
      color: '#c55c51',
      opacity: 1,
    },
    '&$selected': {
      color: '#c55c51',
    },
    '&:focus': {
      color: '#c55c51',
    }
  },
  selected: {},
}))(Tab)
