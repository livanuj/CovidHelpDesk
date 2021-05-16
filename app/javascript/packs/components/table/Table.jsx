import React from 'react';
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {
  useTable,
  useRowSelect,
  useGlobalFilter
} from 'react-table';
import { Checkbox, makeStyles, TableContainer } from '@material-ui/core';
import TableToolbar from './TableToolbar';
import { LocalHospital } from '@material-ui/icons';
import { OutlinedColorButton } from '../../customStyle';


const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const classes = useStyles()
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <Checkbox
          className={classes.root}
          ref={resolvedRef}
          color='default'
          {...rest}
        />
      </>
    )
  }
)

const Table = ({ columns, data, helpRequestHandler }) => {
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { selectedRowIds, globalFilter }
  } = useTable({
    columns,
    data,
  },
    useRowSelect,
    useGlobalFilter,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: 'Multi Select',
          width: 20,
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          )

        },
        ...columns,
        {
          id: 'helpButton',
          Header: '',
          width: 60,
          Cell: ({ row }) => {
            return (
              <OutlinedColorButton
                onClick={() => helpRequestHandler([row.original])}
                variant="outlined"
                startIcon={<LocalHospital />}
              > Help </OutlinedColorButton>
            )
          }
        }
      ])
    }
  )

  const mapDataIdWithIndex = (array, indexes) => {
    return array.filter((_, i) => indexes.includes(i))
  }

  const bulkHelpHandler = () => {
    const selectedIds = mapDataIdWithIndex(
      data,
      Object.keys(selectedRowIds).map(x => parseInt(x, 10))
    )
    helpRequestHandler(selectedIds)
  }

  return (
    <TableContainer>
      <TableToolbar
        numSelected={Object.keys(selectedRowIds).length}
        bulkHelpHandler={bulkHelpHandler}
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell width={column.width} {...column.getHeaderProps({
                  style: { textAlign: 'center', fontSize: '0.8rem' }
                 })}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.length > 0 ? rows.map((row, i) => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TableCell {...cell.getCellProps()} style={{textAlign: 'center', fontSize: '0.8rem' }}>
                      {cell.render('Cell')}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          }) : <tr><td><div style={{width: 150}}>No Data to Show</div></td></tr>}
        </TableBody>
      </MaUTable>
    </TableContainer>
  )
}

const useStyles = makeStyles({
  root: {
    color: '#c55c51',
  },
})

export default Table;
