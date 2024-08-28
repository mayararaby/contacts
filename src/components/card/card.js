import React from 'react';
import { ChipGender } from '../chip';
import { LikeButton } from '../favorite';
import { DeleteButton } from '../delete';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { columnNames } from "../../constants/index"
import { ContactSmallCard } from '../smallCard';
import {EditButton} from "../edit"
import "./index.css"

export const CardItem = ({ rows }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columnNames.map((column) => (
                <TableCell
                  key={columnNames}
                  align={"center"}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const { gender, name, email, phone, picture } = row;
                const { large } = picture;

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell key={index} align={'left'}>
                      <ContactSmallCard name={name} phone={phone} image={large} />
                    </TableCell>

                    <TableCell key={index} align={'left'}>
                        {email}
                    </TableCell>

                    <TableCell key={index} align={'left'}>
                      <ChipGender gender={gender} />
                    </TableCell>

                    <TableCell key={index} align={'left'}>
                      <LikeButton selectedContact={row}/>
                      <EditButton selectedContact={row}/>
                      <DeleteButton selectedContact={row}/>
                    </TableCell>

                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}