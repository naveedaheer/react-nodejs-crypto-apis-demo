import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { useDispatch, useSelector } from "react-redux";
import { cryptoActions } from "../store/actions";
import { Common, CurrencyPair } from "../types/common.types";
import { RootState } from "../store/reducers";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Card,
  //   LinearProgress,
  Paper,
  //   TablePagination,
  ThemeProvider,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { StyledDividerLine, StyledTableHeadCell } from "./StyledComponents";
import { tableTheme } from "./styles/table-style";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: "10px auto",
      paddingTop: "10px",
    },
    table: {
      minWidth: 650,
    },
    tableHeadCell: {
      fontSize: "13px",
      fontWeight: "bold",
      lineHeight: "1.2",
      letterSpacing: "0.9",
      textAlign: "left",
      color: "#232931",
    },
    tableBodyCell: {
      color: "#232931",
      fontSize: "11px",
      paddingTop: "8px",
      paddingBottom: "8px",
    },
    tableBodyIcon: {
      cursor: "pointer",
    },
    colorPrimary: {
      backgroundColor: "#880a15",
    },
    barColorPrimary: {
      backgroundColor: "rgba(240, 144, 146, 1)",
    },
  })
);

const Information = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState({
    symbol: "",
    price: "",
  });
  React.useEffect(() => {
    dispatch(cryptoActions.getCurrencyPair());
  }, [dispatch]);
  console.log(value);
  const cryptoReducer = useSelector((state: RootState) => state.cryptoReducers);
  const currency: CurrencyPair[] = cryptoReducer.currencyPair || [];
  return (
    <>
      <div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={currency}
          getOptionLabel={(option: CurrencyPair) => option.symbol || ""}
          onChange={(event, value) => setValue(value as CurrencyPair)}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Currency Pairs" />
          )}
        />
        <StyledDividerLine />
        <Card className={classes.root}>
          <TableContainer component={Paper}>
            <ThemeProvider theme={tableTheme}>
              <Table
                size="small"
                className={classes.table}
                aria-label="settlement Report list"
              >
                <TableHead>
                  <TableRow>
                    <>
                      <TableCell>
                        <StyledTableHeadCell>BID PRICE</StyledTableHeadCell>
                      </TableCell>
                      <TableCell>
                        <StyledTableHeadCell>BID QUANTITY</StyledTableHeadCell>
                      </TableCell>
                      <TableCell>
                        <StyledTableHeadCell>ASK PRICE</StyledTableHeadCell>
                      </TableCell>
                      <TableCell>
                        <StyledTableHeadCell>ASK QUNATITY</StyledTableHeadCell>
                      </TableCell>
                    </>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {cryptoData &&
                    cryptoData.map((row) => (
                      <TableRow style={{ position: "relative" }}>
                        <>
                          <TableCell className={classes.tableBodyCell}>
                            {row.bidPrice}
                          </TableCell>
                          <TableCell className={classes.tableBodyCell}>
                            {row.bidQty}
                          </TableCell>
                          <TableCell className={classes.tableBodyCell}>
                            {row.askPrice}
                          </TableCell>
                          <TableCell className={classes.tableBodyCell}>
                            {row.askQty}
                          </TableCell>
                        </>
                      </TableRow>
                    ))} */}
                </TableBody>
              </Table>
            </ThemeProvider>
          </TableContainer>
          {/* {cryptoData && cryptoData.length ? (
            <ThemeProvider>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={total}
                rowsPerPage={pagination.limit}
                page={pagination.current_page - 1}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </ThemeProvider>
          ) : null} */}
        </Card>
      </div>
    </>
  );
};

export default Information;
