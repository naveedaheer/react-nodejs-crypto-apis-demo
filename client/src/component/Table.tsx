import React from 'react';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table } from '@material-ui/core';
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
                                    Symbol
                                </TableCell>
                                <TableCell>bid Price</TableCell>
                                <TableCell>bid Quantity</TableCell>
                                <TableCell>ask Price</TableCell>
                                <TableCell>ask Qty</TableCell>
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
            </div>;
        </>
    )

};

export default Information;
