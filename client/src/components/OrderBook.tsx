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
} from "@mui/material";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { StyledDividerLine } from "../StyledComponents";
import { history } from "../helpers";
const client = new W3CWebSocket('ws://order-book-server.herokuapp.com');

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
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
  limit: 10,
};

type RouteParams = {
  pair: string;
};

const OrderBooks = () => {
  const dispatch = useDispatch();
  const params = useParams<RouteParams>();
  const [value, setValue] = React.useState('')
  const [state, setState] = React.useState<OrderBook>({ lastUpdateId: 0, bids: [[]], asks: [[]] })
  const [selectedFilters, setSelectedFilters] = React.useState<filters>(initialFilters);

  const cryptoReducer = useSelector((state: RootState) => state.cryptoReducers);
  // const orderBooks: OrderBook = cryptoReducer.orderBooks || {};
  const pairs: CurrencyPair[] = cryptoReducer.currencyPair || [];

  React.useEffect(() => {
    dispatch(cryptoActions.getCurrencyPair());
  }, [dispatch])

  React.useEffect(() => {
    if (selectedFilters.pair) {
      dispatch(cryptoActions.getOrderBook(selectedFilters));
      history.push(`${selectedFilters.pair}`)
    } else if (params?.pair) {
      setValue(params.pair);
      setSelectedFilters({ ...selectedFilters, pair: params.pair });
    }
  }, [dispatch, value, selectedFilters, params]);

  const handleChange = (value: string) => {
    if (!value) {
      history.push("/")
      dispatch(cryptoActions.getOrderBook({ pair: "", limit: 10 }));
      setState({ lastUpdateId: 0, bids: [[]], asks: [[]] });
    }
    setValue(value);
    setSelectedFilters({ ...selectedFilters, pair: value });
  }

  React.useEffect(() => {
    client.onopen = () => {
      console.log("on open")
      client.send("message from client")
    }
    client.onmessage = (e: any) => {
      if (selectedFilters.pair) {
        setState(JSON.parse(e.data))
      }
    }
  }, [dispatch, selectedFilters]);
  return (
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
        <div style={{ width: '80%' }}>
          <div style={{ margin: '10px' }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={pairs}
              defaultValue={{symbol: selectedFilters.pair}}
              getOptionLabel={(option: CurrencyPair) => option.symbol || ""}
              onChange={(event, value) => handleChange(value?.symbol as string)}
              renderInput={(params) => (
                <TextField {...params} label="Trade Pairs" />
              )}
            />
          </div>
          <div style={{ margin: '10px' }}>
            <StyledDividerLine />
          </div>
          <Card style={{ margin: '10px', display: 'flex' }}>
            <TableContainer style={{ borderRadius: '0px !important' }}>
              <Table sx={{ minWidth: 180 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>BID (PRICE / QTY)</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    state && state?.bids && state?.bids.map((item: string[], i: number) => (
                      <>
                        <StyledTableRow key={i}>
                          <StyledTableCell>{item[0]}<br />{item[1]}</StyledTableCell>
                        </StyledTableRow>
                      </>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer style={{ borderRadius: '0px !important' }}>
              <Table sx={{ minWidth: 180 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ASK (PRICE / QTY)</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    state && state?.asks && state?.asks.map((item: string[], i: number) => (
                      <>
                        <StyledTableRow key={i}>
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
    </React.Fragment>
  );
};

export default OrderBooks;
