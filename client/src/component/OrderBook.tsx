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
  Card, FormControl, InputLabel, MenuItem, Select,
} from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { StyledDividerLine } from "./StyledComponents";
import { history } from "../helpers";

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

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50px'
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px',
  },
  formInput: {
    width: '49%'
  },
  spacing: {
    margin: '10px'
  }
}));

const initialFilters: filters = {
  pair: "",
  limit: 10,
};

type RouteParams = {
  pair: string;
};

const Information = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams<RouteParams>();
  const [value, setValue] = React.useState('')
  const [selectedFilters, setSelectedFilters] = React.useState<filters>(initialFilters);
  React.useEffect(() => {
    dispatch(cryptoActions.getCurrencyPair());
  }, [dispatch]);

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
      dispatch(cryptoActions.resetState())
      history.push("/")
    }
    setValue(value);
    setSelectedFilters({ ...selectedFilters, pair: value });
  }

  const cryptoReducer = useSelector((state: RootState) => state.cryptoReducers);
  const orderBooks: OrderBook = cryptoReducer.orderBooks || {};
  const pairs: CurrencyPair[] = cryptoReducer.currencyPair || [];

  return (
    <>
      <div className={classes.container}>
        <div style={{ width: '80%' }}>
          <div className={classes.form}>
            <div className={classes.formInput}>
              <Autocomplete
                disablePortal
                fullWidth
                id="combo-box-demo"
                options={pairs}
                getOptionLabel={(option: CurrencyPair) => option.symbol || ""}
                onChange={(event, value) => handleChange(value?.symbol as string)}
                renderInput={(params) => (
                  <TextField {...params} label="Trade Pairs" />
                )}
              />
            </div>
            <div className={classes.formInput}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Table Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Table Type"
                >
                  <MenuItem value={10}>Both</MenuItem>
                  <MenuItem value={20}>Buy</MenuItem>
                  <MenuItem value={30}>Sell</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={classes.spacing}>
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
                    orderBooks && orderBooks.bids && orderBooks.bids.map((item: string[], i: number) => (
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
                    orderBooks && orderBooks.bids && orderBooks.asks.map((item: string[], i: number) => (
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
    </>
  );
};

export default Information;
