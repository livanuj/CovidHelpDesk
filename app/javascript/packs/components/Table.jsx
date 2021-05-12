import React from 'react';
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {
  useTable,
  useRowSelect
} from 'react-table';
import { Checkbox, TableContainer } from '@material-ui/core';
import TableToolbar from './TableToolbar';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <Checkbox ref={resolvedRef} {...rest} />
      </>
    )
  }
)

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowIds }
  } = useTable({
    columns,
    data,
  },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: '',
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          )

        },
        ...columns,
      ])
    }
  )

  const mapDataIdWithIndex = (array, indexes) => {
    return array.filter((_, i) => indexes.includes(i))
  }

  const deleteUserHandler = event => {
    const selectedIds = mapDataIdWithIndex(
      data,
      Object.keys(selectedRowIds).map(x => parseInt(x, 10))
    )
    console.log(selectedIds)
    alert(selectedIds.map((item) => item.id))
  }

  return (
    <TableContainer>
      <TableToolbar
        numSelected={Object.keys(selectedRowIds).length}
        deleteUserHandler={deleteUserHandler}
      />
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps()}>
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
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          }) : "No Data to Show"}
        </TableBody>
      </MaUTable>
    </TableContainer>
  )
}

export default Table;
