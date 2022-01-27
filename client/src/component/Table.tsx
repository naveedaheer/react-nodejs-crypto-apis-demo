import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import { useDispatch, useSelector } from 'react-redux';
import { cryptoActions } from '../store/actions';
import { Common } from '../types/common.types';
import { RootState } from '../store/reducers';

const Information = () => {
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(cryptoActions.getSettlementList())
    }, [dispatch])

    const cryptoReducer = useSelector((state: RootState) => state.cryptoReducers);
    const cryptoData: Common[] = cryptoReducer.bidList || [];
    return (
        <>
            <div>
                <TableContainer>
                    <Table aria-label="spanning table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    SYMBOL
                                </TableCell>
                                <TableCell>BID PRICE</TableCell>
                                <TableCell>BID QUANTITY</TableCell>
                                <TableCell>ASK PRICE</TableCell>
                                <TableCell>ASK QUANTITY</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cryptoData && cryptoData.map((row) => (
                                <TableRow>
                                    <TableCell>{row.symbol}</TableCell>
                                    <TableCell>{row.bidPrice}</TableCell>
                                    <TableCell>{row.bidQty}</TableCell>
                                    <TableCell>{row.askPrice}</TableCell>
                                    <TableCell>{row.askQty}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
};

export default Information;
