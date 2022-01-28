import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { useDispatch, useSelector } from "react-redux";
import { cryptoActions } from "../store/actions";
import { OrderBook, CurrencyPair } from "../types/common.types";
import { RootState } from "../store/reducers";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {
  Card,
  Paper,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { StyledDividerLine } from "./StyledComponents";
const client = new W3CWebSocket('ws://localhost:8000');

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Information = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState({
    symbol: "",
    price: "",
  });
  React.useEffect(() => {
    dispatch(cryptoActions.getCurrencyPair());
  }, [dispatch]);

  React.useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Connected');
      client.send("message from client")

    }
    client.onmessage = (e: any) => {
      console.log('EEEEEEEE', e)

    }
  }, []);
  const cryptoReducer = useSelector((state: RootState) => state.cryptoReducers);
  const currency: CurrencyPair[] = cryptoReducer.currencyPair || [];
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>
          <div style={{ margin: '10px' }}>
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
          </div>
          <div style={{ margin: '10px' }}>
            <StyledDividerLine />
          </div>
          <Card style={{ margin: '10px' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>BID (PRICE / QTY)</StyledTableCell>
                    <StyledTableCell>ASK (PRICE / QTY)</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">0.06580800<br />1.83970000</StyledTableCell>
                    <StyledTableCell>0.06580900<br />10.23480000</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>0.06580300<br />0.14850000</StyledTableCell>
                    <StyledTableCell>0.06581000<br />1.70000000</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>0.06579900<br />0.14850000</StyledTableCell>
                    <StyledTableCell>0.06581100<br />0.02560000</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>0.06579600<br />0.10000000</StyledTableCell>
                    <StyledTableCell>0.06581600<br />0.39140000</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>0.06579200<br />0.05940000</StyledTableCell>
                    <StyledTableCell>0.06581700<br />0.97780000</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Information;
