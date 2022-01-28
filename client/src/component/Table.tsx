import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { useDispatch, useSelector } from "react-redux";
import { cryptoActions } from "../store/actions";
import { OrderBook, CurrencyPair, filters } from "../types/common.types";
import { RootState } from "../store/reducers";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Card,
  Paper,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { StyledDividerLine } from "./StyledComponents";

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


const initialFilters: filters = {
  pair: "",
  limit: 5,
};
const Information = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState({
    symbol: "",
  });
  const [selectedFilters, setSelectedFilters] = React.useState<filters>(initialFilters);
  React.useEffect(() => {
    dispatch(cryptoActions.getCurrencyPair());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(cryptoActions.getSettlementList(selectedFilters));
  }, [dispatch, value]);

  const cryptoReducer = useSelector((state: RootState) => state.cryptoReducers);
  const orderBooks: any = cryptoReducer.orderBooks || [];
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
              onChange={(event, value) => { setValue(value as CurrencyPair); setSelectedFilters({ ...selectedFilters, pair: value?.symbol as string }) }}
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    orderBooks && orderBooks.bids && orderBooks.bids.map((item: string[]) => (
                      <>
                        <StyledTableRow>
                          <StyledTableCell>{item[0]}<br />{item[1]}</StyledTableCell>
                        </StyledTableRow>
                      </>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ASK (PRICE / QTY)</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    orderBooks && orderBooks.bids && orderBooks.asks.map((item: string[]) => (
                      <>
                        <StyledTableRow>
                          <StyledTableCell>{item[0]}<br />{item[1]}</StyledTableCell>
                        </StyledTableRow>
                      </>
                    ))
                  }
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
